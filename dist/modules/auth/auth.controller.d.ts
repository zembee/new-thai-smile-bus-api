import { AuthService } from './auth.service';
import { IUser } from '../user/user.schema';
import { SocialAuthDto } from './dto/social-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: {
        user: IUser;
        headers: Record<string, any>;
    }): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    loginSocial(body: SocialAuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        socialLogin: boolean;
    }>;
}
