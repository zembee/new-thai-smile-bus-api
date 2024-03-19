import { Model } from 'mongoose';
import { Station, StationDocument } from './station.schema';
import StationResponseDto from './document/station-response.dto';
import RouteResponseDto from '../route/document/route-response.dto';
export declare class StationService {
    private readonly stationService;
    private readonly routeService;
    private readonly logger;
    getModel(): Model<StationDocument>;
    pagination(query?: Record<string, any>, select?: Record<string, number>, pagination?: {
        page: number;
        perPage: number;
    }, sort?: Record<string, number>): Promise<StationResponseDto[]>;
    findByObjectId(objectId: string): Promise<StationResponseDto>;
    findByObjectIdStatus(objectId: string): Promise<StationResponseDto>;
    findByName(name: string): Promise<StationResponseDto>;
    create(station: Station): Promise<StationDocument>;
    getStations(route: RouteResponseDto): Promise<Record<string, any>>;
    getStationRouteRadius(search: string, lat: number, long: number, minRadius: number, maxRadius: number, quantity: number): Promise<any[]>;
    getStationLinear(station: string, route: string): Promise<any[]>;
}
