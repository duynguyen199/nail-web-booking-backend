import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addMinutes, isBefore } from 'date-fns';

@Injectable()
export class SlotsService {
  constructor(private prismaService: PrismaService) {}

  async getAvailableSlots(techId: string, serviceId: string, date: string) {
    console.log('Tech ID:', techId);

    // ✅ Step 1: Find the nail tech profile (not user)
    const tech = await this.prismaService.nailTechProfile.findUnique({
      where: { id: techId },
      include: { user: true }, // ✅ NailTechProfile → user
    });

    if (!tech || tech.user.role !== 'NAIL_TECH') {
      throw new BadRequestException('Invalid or non-tech user');
    }

    // ✅ Step 2: Check if service exists
    const service = await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Service Not Found');

    // ✅ Step 3: Define start and end of the requested day
    const startOfDay = new Date(`${date}T00:00:00Z`);
    const endOfDay = new Date(`${date}T23:59:59Z`);

    // ✅ Step 4: Find availability for this tech on that date
    const availability = await this.prismaService.availability.findFirst({
      where: {
        techId,
        startAt: { lt: endOfDay },
        endAt: { gt: startOfDay },
        status: 'AVAILABLE',
      },
    });

    if (!availability)
      throw new NotFoundException('Tech is not available for this date');

    // ✅ Step 5: Get buffer + service duration
    const buffer = tech.bufferMinutes ?? 15;
    const serviceDuration = service.durationMinutes;

    // ✅ Step 6: Generate available slots
    const slots: { startAt: Date; endAt: Date }[] = [];
    let slotStart = new Date(availability.startAt);
    const slotEndBoundary = new Date(availability.endAt);

    while (isBefore(addMinutes(slotStart, serviceDuration), slotEndBoundary)) {
      const slotEnd = addMinutes(slotStart, serviceDuration);

      // ✅ Step 7: Skip overlapping appointments
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

      // ✅ Step 8: Move to next slot (service + buffer)
      slotStart = addMinutes(slotStart, serviceDuration + buffer);
    }

    // ✅ Step 9: Return result
    return {
      techId,
      serviceId,
      date,
      availableSlots: slots,
    };
  }
}
