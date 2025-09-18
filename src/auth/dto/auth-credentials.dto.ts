export class AuthCredentialDTO {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: 'CLIENT' | 'NAIL_TECH' | 'ADMIN';
  avatarUrl: string;
}
