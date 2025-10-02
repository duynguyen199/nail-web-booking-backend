import { UserRole } from '../usertype/user.type';
export declare class AuthCredentialDTO {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    avatarUrl: string;
}
