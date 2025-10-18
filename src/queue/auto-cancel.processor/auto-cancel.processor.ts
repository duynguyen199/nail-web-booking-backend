import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { NotificationType } from 'generated/prisma';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@Processor("autoCancel")
export class AutoCancelProcessor extends WorkerHost {
    constructor(private prisma: PrismaService, private notification:NotificationService){
        super()
    }

    async process(job:Job<{appointmentId:string}>){
        const {appointmentId} = job.data
        const appt = await this.prisma.appointment.findUnique({where:{id:appointmentId}})
        if(!appt || appt.status !== "CONFIRMED") return
        await this.prisma.appointment.update({
            where:{id:appointmentId},
            data:{status:"NO_SHOW"}
        })
        await this.prisma.notification.createNotification(
            appt.clientId,
            NotificationType.APPOINTMENT_DENIED,
            {
                title:"Appointment marked as No-Show",
                body:"You missed your check-in window."
            }
        )
    }

}
