import StationResponseDto from './station-response.dto';
export default class StationListResponseDto {
    records: StationResponseDto[];
    page: number;
    perPage: number;
    count: number;
}
