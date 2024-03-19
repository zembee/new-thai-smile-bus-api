import { PipeTransform } from '@nestjs/common';
import { RouteService } from '../route.service';
import RouteResponseDto from '../document/route-response.dto';
import { StationService } from '../../station/station.service';
export declare class RouteTransformPipe implements PipeTransform {
    routeService: RouteService;
    stationService: StationService;
    transform(body: {
        objectId: any;
    }): Promise<RouteResponseDto>;
}
