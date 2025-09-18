import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() authCrentialDTO: AuthCredentialDTO): Promise<void> {
    return this.authService.signup(authCrentialDTO);
  }
}
