import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    objectId?: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    prefix: string;
    firstName: string;
    lastName: string;
    code: string;
    driverLicense?: string;
    driverLicenseExpire?: string;
    position?: string;
    imgProfile?: string;
    birthDate?: Date;
    sex?: string;
    address1?: string;
    address2?: string;
    jobSign?: Date;
    jobOut?: Date;
    token?: string;
    depot?: string;
    roles?: string[];
    status?: string;
    latestLogin?: Date;
    appleId?: string;
    googleId?: string;
    facebookId?: string;
    vehicle?: string;
    createdBy?: string;
    updatedBy?: string;
}
export declare type IUser = User;
export declare const UserSchema: import("mongoose").Schema<Document<User, any>, import("mongoose").Model<any, any, any>, undefined>;