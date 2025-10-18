import { Injectable } from '@nestjs/common';
import twilio from 'twilio';

@Injectable()
export class SmsService {
    private client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN
    )
    async sendSms(to:string,body:string){
        return this.client.messages.create({
            from:process.env.TWILIO_FROM!,
            to,
            body
        })
    }
}
