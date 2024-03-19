import StationsInterface from '../interface/stations.interface';
export default class RouteResponseDto {
    objectId: string;
    name: string;
    description: string;
    status: string;
    bus: {
        online: number;
        offline: number;
    };
    employee: {
        online: number;
        offline: number;
    };
    stations: StationsInterface[];
}
