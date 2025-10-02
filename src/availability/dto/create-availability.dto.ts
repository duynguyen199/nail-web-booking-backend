import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { AvailabilityStatus } from 'generated/prisma';
export class CreateAvailabilityDto {
    @IsUUID() // ensures the input is a valid UUID string ("1b2c3d4e-5678-90ab...").
    @IsNotEmpty()
    @ApiProperty({ //tell Swagger how to document your DTO fields.
        description: "The Nail Tech's profile ID (UUID).",
        example: '1b2c3d4e-5678-90ab-cdef-1234567890ab',
      })
    techId :string;
    
    @IsDateString() //validates that the input is a properly formatted ISO 8601 date string ("2025-10-05T09:00:00.000Z").
    @IsNotEmpty()
    @ApiProperty({
        description: 'Start time of the availability slot (ISO 8601 date string).',
        example: '2025-10-05T09:00:00.000Z',
      })
    startAt:string;

    @ApiProperty({
        description: 'End time of the availability slot (ISO 8601 date string).',
        example: '2025-10-05T17:00:00.000Z',
      })
      @IsDateString()
      @IsNotEmpty()
    
    endAt:string;

    @ApiProperty({
        description: 'Status of the availability slot.',
        enum: AvailabilityStatus, // Swagger will list AVAILABLE, BUSY, LUNCH, ON_HOLD
        example: 'AVAILABLE',
      })
      @IsEnum(AvailabilityStatus)
    status:AvailabilityStatus
}
