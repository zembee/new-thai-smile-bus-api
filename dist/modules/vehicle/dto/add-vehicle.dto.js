"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddVehicleDto {
}
__decorate([
    swagger_1.ApiProperty({
        required: true,
        enum: ['bus', 'taxi', 'van'],
    }),
    class_validator_1.IsIn(['bus', 'taxi', 'van']),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: 'รถ1',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: 'A-1',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "number", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: 'MRSBCREM3MZM00001',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "chassisNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: 'MCS20111175',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "motorNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: 'MINE BUS',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "brand", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: '',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "addressInstall", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: '',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "registerNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: '',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "gpsUnitId", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        example: 'ZUWNCcPgzPenj2akQySTH',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddVehicleDto.prototype, "route", void 0);
exports.default = AddVehicleDto;
//# sourceMappingURL=add-vehicle.dto.js.map