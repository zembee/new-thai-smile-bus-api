import { Document } from 'mongoose';
export declare type DriverTimelineDocument = DriverTimeline & Document;
export declare class DriverTimeline {
    objectId?: string;
    user: string;
    checkIn?: any;
    checkOut?: any;
    status: string;
    remark?: string;
    bus: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const DriverTimelineSchema: import("mongoose").Schema<Document<DriverTimeline, any>, import("mongoose").Model<any, any, any>, undefined>;
