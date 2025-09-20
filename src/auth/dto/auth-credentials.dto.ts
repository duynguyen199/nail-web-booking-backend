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
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsEmail()
  email: string;

  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'phoneNumber must be a valid international number',
  })
  phoneNumber: string;

  @IsEnum(['CLIENT', 'NAIL_TECH', 'ADMIN'], {
    message: 'role must be CLIENT, NAIL_TECH, or ADMIN',
  })
  role: 'CLIENT' | 'NAIL_TECH' | 'ADMIN';

  @IsUrl({}, { message: 'avatarUrl must be a valid URL' })
  avatarUrl: string;
}
