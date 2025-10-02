import { AuthCredentialDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/auth-sigin-credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(authCrentialDTO: AuthCredentialDTO): Promise<void>;
    signIn(signinDTO: SignInDTO): Promise<{
        accessToken: string;
    }>;
    adminOnly(body: any, req: any): {
        message: string;
        user: any;
    };
}
