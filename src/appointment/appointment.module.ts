import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/roles.guard';
import { BullModule } from '@nestjs/bullmq';
import { ReminderProcessors } from './processors/reminder/reminder.processors';
import { AutoCancelProcessor } from 'src/queue/auto-cancel.processor/auto-cancel.processor';

@Module({
  imports:[
    BullModule.registerQueue({
      name:"autoCancel"
    }),
    PrismaModule,JwtModule.register({
    secret:process.env.JWT_SECRET || "your_jwt_secret",
    signOptions:{expiresIn:"1h"}
  })],
  controllers: [AppointmentController],
  providers: [AppointmentService,RolesGuard, ReminderProcessors, AutoCancelProcessor]
})
export class AppointmentModule {}
