import StationDto from './station.dto';
export default class UpdateRouteDto {
    name: string;
    status: string;
    description: string;
    stations: StationDto[];
}
