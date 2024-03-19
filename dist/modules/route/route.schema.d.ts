import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type RouteDocument = Route & Document;
declare class Stations {
    objectId: string;
    type?: string;
    index: number;
}
export declare class Route {
    objectId?: string;
    name: string;
    description: string;
    stations: Stations[];
    history: mongoose.Schema.Types.Mixed;
    status: string;
    createdBy?: string;
    updatedBy?: string;
}
export declare const RouteSchema: mongoose.Schema<Document<Route, any>, mongoose.Model<any, any, any>, undefined>;
export {};
