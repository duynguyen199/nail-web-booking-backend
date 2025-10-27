import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AutoCancelProcessor } from './auto-cancel.processor/auto-cancel.processor';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationModule } from 'src/notification/notification.module';
import { ReminderProcessors } from 'src/appointment/processors/reminder/reminder.processors';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: { url: process.env.REDIS_URL },
    }),
    BullModule.registerQueue(
      { name: 'reminderQueue' },
      { name: 'autoCancel' },
    ),
    NotificationModule,
  ],
  exports: [BullModule],
  providers: [AutoCancelProcessor,ReminderProcessors, PrismaService], // 👈 so other modules can @InjectQueue('autoCancel')
})
export class QueueModule {}
