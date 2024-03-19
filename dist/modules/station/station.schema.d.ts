import { Document } from 'mongoose';
export declare type StationDocument = Station & Document;
declare class Location {
    type: string;
    coordinates: number[];
}
export declare class Station {
    objectId?: string;
    name: string;
    description: string;
    location: Location;
    status?: string;
    createdBy?: string;
    updatedBy?: string;
}
export declare const StationSchema: import("mongoose").Schema<Document<Station, any>, import("mongoose").Model<any, any, any>, undefined>;
export {};
