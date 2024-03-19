import { Model, UpdateWriteOpResult } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { IUser, UserDocument } from './user.schema';
import CreateUserDto from './dto/create-user.dto';
import UserResponseDto from './dto/user-response.dto';
import { DriverTimeline, DriverTimelineDocument } from './driver-timeline.schema';
export declare class UserService {
    private userModel;
    private driverTimeline;
    private readonly configService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, driverTimeline: Model<DriverTimelineDocument>, configService: ConfigService);
    getModel(): Model<UserDocument>;
    hashPassword(password: string): Promise<string>;
    register(body: CreateUserDto): Promise<UserResponseDto>;
    getByEmail(email: string): Promise<UserResponseDto>;
    getByObjectId(objectId: string): Promise<IUser>;
    getByPhoneNumber(phoneNumber: string): Promise<UserResponseDto>;
    getByPhoneNumberOrEmail(username: any): Promise<IUser>;
    update(user: IUser): Promise<UpdateWriteOpResult>;
    findOne(condition: any): Promise<UserResponseDto>;
    createDriverTimeline(body: DriverTimeline): Promise<DriverTimeline>;
    getLatestDriverTimeline(user: string): Promise<DriverTimeline>;
    updateCheckOut(objectId: string): Promise<any>;
    findDriverTimeline(query: any): Promise<DriverTimeline[]>;
}
