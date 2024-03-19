import LocationResponseDto from './location-response.dto';
export default class StationResponseDto {
    objectId: string;
    name: string;
    description: string;
    location: LocationResponseDto;
}
