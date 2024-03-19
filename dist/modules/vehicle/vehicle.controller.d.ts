import { VehicleService } from './vehicle.service';
import RouteResponseDto from '../route/document/route-response.dto';
import VehicleListResponseDto from './document/vehicle-list-response.dto';
import { RouteService } from '../route/route.service';
import { VehicleGateway } from './vehicle.gateway';
export declare class VehicleController {
    vehicleService: VehicleService;
    routeService: RouteService;
    vehicleGatewayService: VehicleGateway;
    private readonly logger;
    vehicleList(body: {
        route: string;
        lat: number;
        long: number;
        minRadius: number;
        maxRadius: number;
    }): Promise<VehicleListResponseDto>;
    getVehicle(vehicle: any): Promise<RouteResponseDto>;
}
