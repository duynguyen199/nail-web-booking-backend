import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface';
import { SignInDTO } from './dto/auth-sigin-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signup(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const { username, password, email, phoneNumber, role, avatarUrl } =
      authCredentialDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      role,
      avatarUrl,
    });
    await this.userRepository.save(user);
  }
  async signin(siginDTO: SignInDTO): Promise<{ accessToken: string }> {
    const { username, password } = siginDTO;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Check username or password');
    }
  }
}
