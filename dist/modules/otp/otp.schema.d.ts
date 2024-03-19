import { Document } from 'mongoose';
export declare type OtpDocument = Otp & Document;
export declare class Otp {
    objectId?: string;
    verifyCode: string;
    verifyNumber: string;
    isVerify: boolean;
    username?: string;
    expire: Date;
}
export declare const OtpSchema: import("mongoose").Schema<Document<Otp, any>, import("mongoose").Model<any, any, any>, undefined>;
