import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('notification')
@ApiTags('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully',
  })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.createNotification(
      dto.userId,
      dto.type,
      { title: dto.title, body: dto.body },
    );
  }


  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'List of all notifications' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get notifications by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID to filter notifications' })
  @ApiResponse({ status: 200, description: 'List of user-specific notifications' })
  findByUser(@Param('userId') userId: string) {
    return this.notificationService.findByUser(userId);
  }

  @Patch(':id/read') 
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  markAsRead(@Param('id') id: string) {
    return this.notificationService.update(id,{isRead:true})
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
