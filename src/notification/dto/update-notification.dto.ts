import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @ApiPropertyOptional({ example: true, description: 'Mark as read or unread' })
    isRead?: boolean;
  
    @ApiPropertyOptional({ example: 'Updated title', description: 'Notification title (optional)' })
    title?: string;
  
    @ApiPropertyOptional({ example: 'Updated body text', description: 'Notification body (optional)' })
    body?: string;
}
