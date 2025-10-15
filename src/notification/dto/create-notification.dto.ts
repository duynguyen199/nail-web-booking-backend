import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: 'user-123',
    description: 'User ID receiving the notification',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    enum: NotificationType,
    description: 'Type of the notification',
  })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    example: 'New appointment booked',
    description: 'Notification title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Client John booked an appointment',
    required: false,
  })
  @IsOptional()
  @IsString()
  body?: string;
}
