import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
  async createUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const { username, password, email, phoneNumber, role, avatarUrl } =
      authCredentialDTO;
    //hash

    const user = this.create({
      username,
      password,
      email,
      phoneNumber,
      role,
      avatarUrl,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
