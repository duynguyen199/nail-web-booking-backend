import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationType } from 'generated/prisma';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  constructor(private prismaService:PrismaService,
            private eventMitter: EventEmitter2){}
  async createNotification(userId:string,type:NotificationType,payload:any) {

    const notifi =await this.prismaService.notification.create({
      data: {
        userId,
        type,
        title: payload.title,
        body: payload.body ?? null,
        payload
      },
    });
    this.eventMitter.emit('notification.created', notifi);
    return notifi
  }

  async findAll() {

    return await this.prismaService.notification.findMany({
        orderBy:{createAt:"asc"}
    });
  }


  async findByUser(userId: string) {

    return await this.prismaService.notification.findMany({
      where:{userId},
      orderBy:{createdAt:"desc"}
    });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return await this.prismaService.notification.update({
        where:{id},
        data:updateNotificationDto
    })
    
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
