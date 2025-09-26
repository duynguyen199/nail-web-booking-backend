import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @ApiProperty({
    description: 'Service name',
    example: 'Manicure',
    minLength: 2,
    maxLength: 50,
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Service description',
    example: 'Manicure is cutting and shaping nails',
    minLength: 10,
    maxLength: 300,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Duration of the service in minutes',
    example: 30,
    required: true,
  })
  @IsInt()
  durationMinutes: number;

  @IsNumber()
  @ApiProperty({
    description: 'Price of the service in USD',
    example: 55.5,
    required: true,
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Whether the service is active',
    example: true,
    required: true,
  })
  isActive: boolean;
}
