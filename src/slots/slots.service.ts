import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addMinutes, isBefore } from 'date-fns';

@Injectable()
export class SlotsService {
  constructor(private prismaService: PrismaService) {}

  async getAvailableSlots(techId: string, serviceId: string, date: string) {
    console.log('Tech ID:', techId);

    // ✅ Step 1: Validate and parse the date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    // ✅ Step 2: Define start and end of the requested day in UTC
    const dateString = parsedDate.toISOString().split('T')[0]; // Extract YYYY-MM-DD
    const dayStart = new Date(`${dateString}T00:00:00.000Z`); // UTC midnight
    const dayEnd = new Date(`${dateString}T23:59:59.999Z`); // UTC end of day

    console.log('Day Start:', dayStart.toISOString());
    console.log('Day End:', dayEnd.toISOString());

    // ✅ Step 3: Find the nail tech profile (not user)
    const tech = await this.prismaService.nailTechProfile.findUnique({
      where: { id: techId },
      include: { user: true },
    });

    if (!tech || tech.user.role !== 'NAIL_TECH') {
      throw new BadRequestException('Invalid or non-tech user');
    }

    // ✅ Step 4: Check if service exists
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Service Not Found');

    // ✅ Step 5: Find availability for this tech on that date
 
    const availability = await this.prismaService.availability.findMany({
      where: {
        techId,
        startAt: { lt: dayEnd },
        endAt: { gt: dayStart },
        status: 'AVAILABLE',
      },
    });

    if (!availability)
      throw new NotFoundException('Tech is not available for this date');

    // ✅ Step 6: Get buffer + service duration
    const buffer = tech.bufferMinutes ?? 15;
    const serviceDuration = service.durationMinutes;

    // ✅ Step 7: Generate available slots
    const slots: { startAt: Date; endAt: Date }[] = [];
    let slotStart = new Date(availability.startAt);
    const slotEndBoundary = new Date(availability.endAt);

    while (isBefore(addMinutes(slotStart, serviceDuration), slotEndBoundary)) {
      const slotEnd = addMinutes(slotStart, serviceDuration);

      // ✅ Step 8: Skip overlapping appointments
      const overlapping = await this.prismaService.appointment.findFirst({
        where: {
          techId,
          status: { in: ['PENDING', 'CONFIRMED'] },
          OR: [
            {
              startAt: { lt: slotEnd },
              endAt: { gt: slotStart },
            },
          ],
        },
      });

      if (!overlapping) {
        // ✅ Only add free slots
        slots.push({ startAt: slotStart, endAt: slotEnd });
      }

      // ✅ Step 9: Move to next slot (service + buffer)
      slotStart = addMinutes(slotStart, serviceDuration + buffer);
    }

    // ✅ Step 10: Return result
    return {
      techId,
      serviceId,
      date: parsedDate.toISOString(),
      availableSlots: slots,
    };
  }
}