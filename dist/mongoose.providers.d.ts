/// <reference types="mongoose" />
import { User } from './modules/user/user.schema';
import { Otp } from './modules/otp/otp.schema';
import { Route } from './modules/route/route.schema';
import { DriverTimeline } from './modules/user/driver-timeline.schema';
import { Announcement } from './modules/announcement/announcement.schema';
import { Vehicle } from './modules/vehicle/vehicle.schema';
import { Station } from './modules/station/station.schema';
import { FeedBack } from './modules/feedback/feedback.schema';
export declare const models: ({
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<User, any>, import("mongoose").Model<any, any, any>, undefined>;
} | {
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<Otp, any>, import("mongoose").Model<any, any, any>, undefined>;
} | {
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<Vehicle, any>, import("mongoose").Model<any, any, any>, undefined>;
} | {
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<Route, any>, import("mongoose").Model<any, any, any>, undefined>;
} | {
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<Station, any>, import("mongoose").Model<any, any, any>, undefined>;
} | {
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<DriverTimeline, any>, import("mongoose").Model<any, any, any>, undefined>;
} | {
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<Announcement, any>, import("mongoose").Model<any, any, any>, undefined>;
} | {
    name: string;
    schema: import("mongoose").Schema<import("mongoose").Document<FeedBack, any>, import("mongoose").Model<any, any, any>, undefined>;
})[];
