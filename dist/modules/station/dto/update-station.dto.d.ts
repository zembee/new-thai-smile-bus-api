import LocationDto from './location.dto';
export default class UpdateStationDto {
    status: string;
    name: string;
    description: string;
    location: LocationDto;
}
