import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly configService: ConfigService;
    private readonly usersService;
    constructor(configService: ConfigService);
    validate(jwtPayload: any, done: any): Promise<void>;
}
export {};
