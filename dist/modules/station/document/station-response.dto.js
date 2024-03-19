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
const location_response_dto_1 = __importDefault(require("./location-response.dto"));
class StationResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'r-SQWiihXS1ATbXYbVdmk',
        description: 'objectId',
    }),
    __metadata("design:type", String)
], StationResponseDto.prototype, "objectId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'ป้ายรถประจำทาง ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ 32/2',
        description: 'ชื่อป้าย',
    }),
    __metadata("design:type", String)
], StationResponseDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ32/2,ตรงข้ามธนาคารกสิกรไทย,ถนนราษฎร์บูรณะ เขตราษฎร์บูรณะ แขวงราษฎร์บูรณะ กรุงเทพมหานคร 10140',
        description: 'รายระเอียด',
    }),
    __metadata("design:type", String)
], StationResponseDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'type': 'Point',
            'coordinates': [
                100.513886,
                13.677417,
            ],
        },
        description: 'ตำแหน่งที่ตั้ง',
    }),
    __metadata("design:type", location_response_dto_1.default)
], StationResponseDto.prototype, "location", void 0);
exports.default = StationResponseDto;
//# sourceMappingURL=station-response.dto.js.map