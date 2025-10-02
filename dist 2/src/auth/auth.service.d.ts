import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/auth-sigin-credentials.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(authCredentialDTO: AuthCredentialDTO): Promise<void>;
    signin(signinDTO: SignInDTO): Promise<{
        accessToken: string;
    }>;
}
