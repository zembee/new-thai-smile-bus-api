import RouteResponseDto from '../../route/document/route-response.dto';
export default class VehicleResponseDto {
    number: string;
    registerNumber: string;
    chassisNumber: string;
    motorNumber: string;
    passengerCount: number;
    wifiConnectCount: number;
    employee: Record<string, any>;
    speed: number;
    latestActive: Date;
    route: RouteResponseDto;
    objectId: string;
    location: Record<string, any>;
    status?: string;
}
