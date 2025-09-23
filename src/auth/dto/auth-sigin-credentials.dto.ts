import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class SignInDTO {
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
}