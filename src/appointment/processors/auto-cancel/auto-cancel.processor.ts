import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { stringify } from 'querystring';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@Processor("autoCancelQueue")
export class AutoCancelProcessor extends WorkerHost {
    constructor(private prismaService:PrismaService){super()}

    async process(job: Job<{ appointmentId: string }>) {
        const { appointmentId } = job.data;
        const appt = await this.prismaService.appointment.findUnique({
          where: { id: appointmentId },
        });
        if (!appt || appt.status !== 'CONFIRMED') return;
        const now = new Date();
        const lateThreshold = 
          new Date(appt.startAt).getTime() + parseInt(process.env.LATE_THRESHOLD_MIN || '30', 10) * 60_000;
      
        if (now.getTime() > lateThreshold) {
          await this.prismaService.appointment.update({
            where: { id: appointmentId },
            data: { status: 'CANCELLED' },
          });
        }
      }
}
