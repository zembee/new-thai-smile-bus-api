import { Document } from 'mongoose';
export declare type AnnouncementDocument = Announcement & Document;
export declare class Announcement {
    objectId?: string;
    type: string;
    url: string;
    title: string;
    subtitle: string;
    startDate: Date;
    endDate: Date;
    status: string;
}
export declare const AnnouncementSchema: import("mongoose").Schema<Document<Announcement, any>, import("mongoose").Model<any, any, any>, undefined>;
