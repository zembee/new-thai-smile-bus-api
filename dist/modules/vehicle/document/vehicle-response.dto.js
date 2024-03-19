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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const route_response_dto_1 = __importDefault(require("../../route/document/route-response.dto"));
class VehicleResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'เลขรถ',
        example: 'A-1',
    }),
    __metadata("design:type", String)
], VehicleResponseDto.prototype, "number", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'เลขทะเบียน',
        example: 'กข062347',
    }),
    __metadata("design:type", String)
], VehicleResponseDto.prototype, "registerNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'คัสซี',
        example: 'MRSBCREM3MZM00001',
    }),
    __metadata("design:type", String)
], VehicleResponseDto.prototype, "chassisNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'เครื่องยนต์',
        example: 'MCS20111175',
    }),
    __metadata("design:type", String)
], VehicleResponseDto.prototype, "motorNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'จำนวนผู้โดยสาร',
        example: 10,
    }),
    __metadata("design:type", Number)
], VehicleResponseDto.prototype, "passengerCount", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'เชื่อมต่อวายฟาย',
        example: 5,
    }),
    __metadata("design:type", Number)
], VehicleResponseDto.prototype, "wifiConnectCount", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'พนักงาน',
        example: '',
    }),
    __metadata("design:type", Object)
], VehicleResponseDto.prototype, "employee", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'ความเร็วของรถ',
        example: 120,
    }),
    __metadata("design:type", Number)
], VehicleResponseDto.prototype, "speed", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'วันที่อัพเดท gps ล่าสุด UTC',
        example: new Date(),
    }),
    __metadata("design:type", Date)
], VehicleResponseDto.prototype, "latestActive", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'สายรถ',
        example: '6',
    }),
    __metadata("design:type", route_response_dto_1.default)
], VehicleResponseDto.prototype, "route", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'objectId',
        example: '76mVcq5830o-aqsBy3oOm',
    }),
    __metadata("design:type", String)
], VehicleResponseDto.prototype, "objectId", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'location',
        example: {
            type: 'Point',
            coordinates: [
                100.521831,
                13.667928,
            ],
        },
    }),
    __metadata("design:type", Object)
], VehicleResponseDto.prototype, "location", void 0);
exports.default = VehicleResponseDto;
//# sourceMappingURL=vehicle-response.dto.js.map