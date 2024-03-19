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
class StationLinearResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'r-SQWiihXS1ATbXYbVdmk',
        description: 'objectId station',
    }),
    __metadata("design:type", String)
], StationLinearResponseDto.prototype, "objectId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '17',
        description: 'ตำแหน่งป้าย',
    }),
    __metadata("design:type", String)
], StationLinearResponseDto.prototype, "index", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'ปตท.LPGและน้ำมัน (ตรงข้ามหมู่บ้านเกาหลีรามอินทรา)',
        description: 'ชื่อป้าย',
    }),
    __metadata("design:type", String)
], StationLinearResponseDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'return',
        description: 'ประเภทป้าย',
    }),
    __metadata("design:type", String)
], StationLinearResponseDto.prototype, "type", void 0);
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
    __metadata("design:type", String)
], StationLinearResponseDto.prototype, "location", void 0);
exports.default = StationLinearResponseDto;
//# sourceMappingURL=station-linear-response.dto.js.map