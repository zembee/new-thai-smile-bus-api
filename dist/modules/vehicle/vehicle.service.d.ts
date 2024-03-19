import { Vehicle, VehicleDocument } from './vehicle.schema';
import { Model } from 'mongoose';
import BusLocationInterface from './interfaces/bus-location.interface';
export declare class VehicleService {
    private readonly vehicleModel;
    private readonly logger;
    getModel(): Model<VehicleDocument>;
    pagination(query?: Record<string, any>, select?: Record<string, number>, pagination?: {
        page: number;
        perPage: number;
    }, sort?: Record<string, number>): Promise<Vehicle[]>;
    updateVehicleLocation(locations: BusLocationInterface[]): Promise<Vehicle[]>;
    getVehicleRouteRadius(objectId: string, lat: number, long: number, minRadius: number, maxRadius: number): Promise<any[]>;
    getVehicleRouteRadius2<T>(objectId: string, lat: number, long: number, minRadius: number, maxRadius: number): Promise<T[]>;
    getVehicleRouteStationRadius<T>(objectId: string, lat: number, long: number, minRadius: number, maxRadius: number, objectIdRoute: string[]): Promise<T[]>;
}
