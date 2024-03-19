import { Model } from 'mongoose';
import { RouteDocument } from './route.schema';
import StationResponseDto from '../station/document/station-response.dto';
import RouteResponseDto from './document/route-response.dto';
import RouteStationResponseDto from './document/route-station-response.dto';
import RouteSwitchResponseDto from './document/route-switch-response.dto';
export declare class RouteService {
    private readonly routeService;
    private readonly logger;
    getModel(): Model<RouteDocument>;
    pagination(query?: Record<string, any>, select?: Record<string, number>, pagination?: {
        page: number;
        perPage: number;
    }, sort?: Record<string, number>): Promise<StationResponseDto[]>;
    findByObjectId(objectId: string): Promise<RouteResponseDto>;
    findStaion(objectId: string): Promise<RouteStationResponseDto[]>;
    findinObjectId(origin: string, destination: string): Promise<RouteStationResponseDto[]>;
    findRouteStaion(objectId: string): Promise<RouteStationResponseDto[]>;
    findRouteStaionSwitch(stations: string, routes: string[]): Promise<RouteSwitchResponseDto[]>;
}
