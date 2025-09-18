import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
  async createUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const { username, password, email, phoneNumber, role, avatarUrl } =
      authCredentialDTO;
    const user = this.create({
      username,
      password,
      email,
      phoneNumber,
      role,
      avatarUrl,
    });
    await this.save(user);
  }
}
