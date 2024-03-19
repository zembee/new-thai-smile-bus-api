import { PipeTransform } from '@nestjs/common';
import { StationService } from '../station.service';
import StationResponseDto from '../document/station-response.dto';
export declare class StationTransformPipe implements PipeTransform {
    stationService: StationService;
    transform(body: {
        objectId: any;
    }): Promise<StationResponseDto>;
}
