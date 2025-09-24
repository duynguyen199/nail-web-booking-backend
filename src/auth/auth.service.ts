import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/auth-sigin-credentials.dto';
import { JwtPayload } from './jwt.payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const { username, password, email, phoneNumber, role, avatarUrl } =
      authCredentialDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
          phoneNumber,
          role,
          avatarUrl,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }

  async signin(signinDTO: SignInDTO): Promise<{ accessToken: string }> {
    const { username, password } = signinDTO;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check username or password');
    }
  }
}
