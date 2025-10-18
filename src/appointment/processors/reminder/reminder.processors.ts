import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
@Processor('reminderQueue')

export class ReminderProcessors extends WorkerHost {
    constructor(private prismaService: PrismaService, private sms:SmsService){super()}
    async process(job:Job<{appointmentId:string}>){
        const {appointmentId} = job.data
        const appt =await this.prismaService.appointment.findUnique({
            where:{id:appointmentId},
            include:{client:true}
        })
        if(!appt || appt.status !== "CONFIRMED") return
        const checkInUrl =`${process.env.FRONTEND_URL}/checkin/${appointmentId}`
        const msg = `Reminder: You have a nail appointment tomorrow at ${appt.startAt}. Please check in online: ${checkInUrl}`;
        await this.sms.sendSms(appt.client.phoneNumber,msg)
    }
}
