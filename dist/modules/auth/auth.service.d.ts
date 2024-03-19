import { IUser } from '../user/user.schema';
import { SocialAuthDto } from './dto/social-auth.dto';
export declare class AuthService {
    private readonly logger;
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    createToken(user: IUser): {
        refreshToken: string;
        accessToken: string;
    } & IUser;
    createSocialToken(body: SocialAuthDto): Promise<{
        refreshToken: string;
        accessToken: string;
        socialLogin: boolean;
    }>;
    comparePassword(original: string, hashed: string): Promise<boolean>;
    validateUser(username: string, pass: string): Promise<any>;
}
