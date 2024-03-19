import { PipeTransform } from '@nestjs/common';
import { VehicleService } from '../vehicle.service';
import VehicleResponseDto from '../document/vehicle-response.dto';
import { StationService } from '../../station/station.service';
import { RouteService } from '../../route/route.service';
export declare class VehicleTransformPipe implements PipeTransform {
    busService: VehicleService;
    stationService: StationService;
    routeService: RouteService;
    transform(body: {
        objectId: any;
    }): Promise<Partial<VehicleResponseDto>>;
}
