import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class AuthCredentialDTO {
  @IsString()
  @ApiProperty({
    description: 'Username for login',
    example: 'duy_nguyen',
    minLength: 4,
    maxLength: 20,
    required: true,
  })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @ApiProperty({
    description:
      'Password must be 8-20 characters long, include uppercase, lowercase, number/special character',
    example: 'StrongP@ssw0rd',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsEmail()
  @ApiProperty({
    description: 'User email address',
    example: 'abc@gmail.com',
  })
  email: string;

  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'phoneNumber must be a valid international number',
  })
  @ApiProperty({
    description:
      'The international phone number of the user (e.g., +12025550123)',
    example: '+12025550123',
    required: true,
  })
  phoneNumber: string;

  @IsEnum(['CLIENT', 'NAIL_TECH', 'ADMIN'], {
    message: 'role must be CLIENT, NAIL_TECH, or ADMIN',
  })
  @ApiProperty({
    description: 'The role of the user',
    enum: ['CLIENT', 'NAIL_TECH', 'ADMIN'],
    example: 'CLIENT',
    required: true,
  })
  role: 'CLIENT' | 'NAIL_TECH' | 'ADMIN';

  @IsUrl({}, { message: 'avatarUrl must be a valid URL' })
  @ApiProperty({
    description: "The URL of the user's avatar image",
    example: 'https://example.com/avatar.jpg',
    required: true,
  })
  avatarUrl: string;
}
