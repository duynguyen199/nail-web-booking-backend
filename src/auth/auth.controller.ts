import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dto/auth-sigin-credentials.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  @ApiOkResponse({ description: 'Signup success' })
  signup(@Body() authCrentialDTO: AuthCredentialDTO): Promise<void> {
    return this.authService.signup(authCrentialDTO);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'Login success' })
  signIn(@Body() signinDTO: SignInDTO): Promise<{ accessToken: string }> {
    console.log('Request Body:', signinDTO);
    return this.authService.signin(signinDTO);
  }
}
