import StationListResponseDto from './document/station-list-response.dto';
import StationListDto from './dto/station-list.dto';
import StationLinearDto from './dto/linear-station.dto';
import StationResponseDto from './document/station-response.dto';
export declare class StationController {
    private readonly stationService;
    stationList(queries: StationListDto): Promise<StationListResponseDto>;
    StationLinearList(query: StationLinearDto): Promise<any>;
    getStation(station: any): Promise<StationResponseDto>;
}
