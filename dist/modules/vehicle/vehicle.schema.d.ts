import mongoose, { Document } from 'mongoose';
export declare type VehicleDocument = Vehicle & Document;
declare class Location {
    type: string;
    coordinates: number[];
}
export declare class Vehicle {
    objectId?: string;
    type?: string;
    routeStatus?: string;
    name?: string;
    number?: string;
    chassisNumber?: string;
    motorNumber?: string;
    brand?: string;
    addressInstall?: string;
    registerNumber?: string;
    gpsUnitId: string;
    employee?: any[];
    route?: any;
    depot?: string;
    latestActive?: Date;
    location?: Location;
    speed?: number;
    engineStatus?: boolean;
    status?: string;
    createdBy?: string;
    updatedBy?: string;
}
export declare const VehicleSchema: mongoose.Schema<mongoose.Document<Vehicle, any>, mongoose.Model<any, any, any>, undefined>;
export {};
