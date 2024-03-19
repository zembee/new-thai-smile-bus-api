import { PipeTransform } from '@nestjs/common';
import { RouteService } from '../route.service';
import RouteResponseDto from '../document/route-response.dto';
export declare class RouteAbsoluteTransformPipe implements PipeTransform {
    routeService: RouteService;
    transform(body: {
        objectId: any;
    }): Promise<RouteResponseDto>;
}
