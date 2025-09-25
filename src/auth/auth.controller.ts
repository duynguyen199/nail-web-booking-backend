import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dto/auth-sigin-credentials.dto';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
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
  @Post('/admin-only')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOkResponse({ description: 'Admin-only action' })
  @ApiBearerAuth('access-token')
  adminOnly(@Body() body: any, @Request() req: any) {
    return { message: 'This is an admin-only route', user: req.user };
  }
}
