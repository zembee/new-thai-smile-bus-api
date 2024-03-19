import StationDto from './station.dto';
export default class CreateRouteDto {
    name: string;
    description: string;
    stations: StationDto[];
}
