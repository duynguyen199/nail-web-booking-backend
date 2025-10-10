import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  @ApiProperty()
  clientId: string;

  @IsUUID()
  @ApiProperty()
  techId: string;

  @IsUUID()
  @ApiProperty()
  serviceId: string;

  @ApiProperty({
    description: 'Start time of the appointment (must fit within availability)',
    example: '2025-10-12T10:00:00.000Z',
  })
  @IsDateString()
  startAt: string;

  @ApiProperty({
    description:
      'Optional note or reason for booking (e.g., "Full manicure with nail art")',
    example: 'Full manicure with nail art and cuticle treatment',
    required: false,
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
