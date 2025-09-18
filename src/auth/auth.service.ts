import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signup(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const { username, password, email, phoneNumber, role, avatarUrl } =
      authCredentialDTO;
    const user = this.userRepository.create({
      username,
      password,
      email,
      phoneNumber,
      role,
      avatarUrl,
    });
    await this.userRepository.save(user);
  }
}
