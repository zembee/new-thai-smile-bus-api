export default class VehicleListResponseDto {
    records: Record<string, any>[];
    page: number;
    perPage: number;
    count: number;
}
