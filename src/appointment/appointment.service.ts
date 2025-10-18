import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from 'generated/prisma';
import { addMinutes, isAfter, isBefore, parseISO } from 'date-fns';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()

export class AppointmentService {
  constructor(
    private prismaService: PrismaService,
    @InjectQueue('reminderQueue') private reminderQueue: Queue,

    @InjectQueue('autoCancel') private readonly autoCancelQueue: Queue,
  ) {}

  async makeAppoinment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { clientId, serviceId, techId, startAt, reason } =
      createAppointmentDto;
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');

    const techProfile = await this.prismaService.nailTechProfile.findUnique({
      where: { userId: techId },
    });
    if (!techProfile) throw new NotFoundException('Nail tech not found');

    const tech = await this.prismaService.user.findUnique({
      where: { id: techId },
    });
    if (tech.role !== 'NAIL_TECH' || !tech)
      throw new ForbiddenException('Invalid or non-tech user');

    const client = await this.prismaService.user.findUnique({
      where: { id: clientId },
    });
    if (!client || client.role !== 'CLIENT') {
      throw new ForbiddenException('Invalid or non-client user');
    }
    const start = parseISO(startAt); //Client passes startAt (e.g., 2025-10-12T10:00:00.000Z).
    const end = addMinutes(start, service.durationMinutes); //duration 60 → start=10:00, end=11:00.

    //validate working hours
    const [startH, startM] = techProfile.workingHours.start
      .split(':')
      .map(Number);
    //example ['09', '00'] becomes [9, 0], and ['17', '00'] becomes [17, 0].

    const [endH, endM] = techProfile.workingHours.end.split(':').map(Number);
    const workStart = new Date(start);
    const workEnd = new Date(start);

    workStart.setUTCHours(startH, startM, 0, 0);
    //.setUTCHours(startH, startM, 0, 0): Sets the time components of workStart to the working hours start time:
    workEnd.setUTCHours(endH, endM, 0, 0);

    //Ensures the entire appointment duration fits within the technician's working hours.
    if (isBefore(start, workStart) || isAfter(end, workEnd)) {
      throw new BadRequestException('Appointment times outside working hours');
    }

    const overlapping = await this.prismaService.appointment.findFirst({
      where: {
        techId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [{ startAt: { lt: end }, endAt: { gt: start } }],
      },
    });
    if (overlapping) throw new BadRequestException('This time is booked');

    const buffer = techProfile.bufferMinutes ?? 15;
    const bufferConflict = await this.prismaService.appointment.findFirst({
      where: {
        techId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          { endAt: { gt: addMinutes(start, -buffer), lt: start } },
          { startAt: { lt: addMinutes(end, buffer), gt: end } },
        ],
      },
    });
    if (bufferConflict)
      throw new BadRequestException(
        `Must respect ${buffer}-minute buffer between bookings`,
      );
    return this.prismaService.appointment.create({
      data: {
        clientId,
        techId,
        serviceId,
        startAt: start,
        endAt: end,
        reason,
        status: 'PENDING',
      },
    });
  }
  // async getAllAppointment(): Promise<Appointment[]> {
  //   return this.prismaService.appointment.findMany({
  //     include: {
  //       client: { select: { username: true, email: true } },
  //       tech: { select: { username: true, email: true } },
  //       service: true,
  //     },
  //     orderBy: { startAt: 'asc' },
  //   });
  // }
  async confirmAppointment(id: string): Promise<Appointment> {
    const appointment = await this.prismaService.appointment.findUnique({
      where: { id },
      data:{status:"CONFIRMED"},
      include: { client: true },

    });
    if (!appointment) throw new NotFoundException('Not appoitnment found');

    const reminderTime = 
      new Date(appointment.startAt).getTime() -24 *60*60*1000
    const delayReminder = Math.max(0, reminderTime - Date.now());
    await this.reminderQueue.add("sendReminder",{appointmentId:id},{delay:delayReminder})

    const cancelTime = 
      new Date(appointment.startAt).getTime() + 
        parseInt(process.env.LATE_THRESHOLD_MIN || 30,10) * 60_000
    const delayCancel = Math.max(0, cancelTime-Date.now())
    await this.autoCancelQueue.add("autoCancel", {appointmentId:id}, {delay:delayCancel})


    return appointment
  }
  async denyAppointment(id: string, reason: string): Promise<Appointment> {
    const appointment = await this.prismaService.appointment.findUnique({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('No appointment found');
    if (appointment.status !== 'PENDING') {
      throw new BadRequestException(
        `Only pending appointments can be confirmed. Current status: ${appointment.status}`,
      );
    }
    return this.prismaService.appointment.update({
      where: { id },
      data: { status: 'DENIED', reason },
    });
  }
  async getAppointments(
    role: 'CLIENT' | 'NAIL_TECH' | 'ADMIN',
    userId: string,
    status?: string,
    from?: string,
    to?: string,
  ): Promise<Appointment[]> {
    const where: any = {};
    if (role === 'CLIENT') where.clientId = userId;
    else if (role === 'NAIL_TECH') where.techId = userId;
    if (status) where.status = status;
    if (from || to) {
      where.startAt = {};
      if (from) where.startAt.gte = new Date(from);
      if (to) where.startAt.lte = new Date(to);
    }
    return this.prismaService.appointment.findMany({
      where,
      include: {
        client: { select: { username: true, email: true } },
        tech: { select: { username: true, email: true } },
        service: true,
      },
      orderBy: { startAt: 'asc' },
    });
  }
  async checkInAppointment(id: string): Promise<{ message: string }> {
    const appt = await this.prismaService.appointment.findUnique({ where: { id } });

    if (!appt) {
      throw new NotFoundException('Appointment not found');
    }

    const now = new Date();
    const lateLimit =
      new Date(appt.startAt).getTime() +
      parseInt(process.env.LATE_THRESHOLD_MIN || '30', 10) * 60_000;

    if (now.getTime() > lateLimit) {
      await this.prismaService.appointment.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
      return { message: 'Too late! Appointment automatically cancelled.' };
    }

    await this.prismaService.appointment.update({
      where: { id },
      data: { status: 'CHECKED_IN' },
    });

    return { message: 'Check-in successful!' };
  }
}
