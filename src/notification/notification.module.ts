import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[EventEmitterModule.forRoot()],
  controllers: [NotificationController],
  providers: [NotificationService,PrismaService, NotificationGateway],
  exports: [NotificationService],

})
export class NotificationModule {}
