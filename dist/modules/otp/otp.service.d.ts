import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Otp, OtpDocument } from './otp.schema';
export declare class OtpService {
    private otpModel;
    private readonly configService;
    private readonly logger;
    constructor(otpModel: Model<OtpDocument>, configService: ConfigService);
    getModel(): Model<OtpDocument>;
    create(createBody: Otp): Promise<Otp>;
    generateOtp(): {
        ref: string;
        otp: string;
    };
    sendSms(message: string, ref: string, telNo: string): Promise<void>;
    sendEmail(message: string, ref: string, destination: string): Promise<void>;
}
