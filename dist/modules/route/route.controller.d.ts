import RouteListResponseDto from './document/route-list-response.dto';
import RouteResponseDto from './document/route-response.dto';
import { StationService } from '../station/station.service';
import RouteDestinationDto from './dto/route-destination.dto';
import RouteStationResponseDto from './document/route-station-response.dto';
import RouteSwitchDto from './dto/route-switch.dto';
export declare class RouteController {
    private readonly routeService;
    stationService: StationService;
    routeList(body: {
        objectId: string;
    }): Promise<RouteListResponseDto[]>;
    routeListFromDestination(body: RouteDestinationDto): Promise<any>;
    routeOriginDestinationList(query: RouteDestinationDto): Promise<any>;
    routeSwitchList(query: RouteSwitchDto, routeArray: string[]): Promise<any>;
    getRoute(route: any): Promise<RouteResponseDto>;
    getRouteStation(params: any): Promise<Array<RouteStationResponseDto>>;
}
