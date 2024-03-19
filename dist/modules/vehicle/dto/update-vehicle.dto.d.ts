export default class UpdateVehicleDto {
    status: string;
    type: string;
    name: string;
    number: string;
    chassisNumber?: string;
    motorNumber?: string;
    brand?: string;
    addressInstall?: string;
    registerNumber?: string;
    gpsUnitId?: string;
    route?: string;
}
