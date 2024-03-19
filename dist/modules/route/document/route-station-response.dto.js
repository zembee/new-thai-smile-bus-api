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
class RouteStationResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'objectId',
        required: true,
        example: '8aWgy2mSufJquQzIysk2j',
    }),
    __metadata("design:type", String)
], RouteStationResponseDto.prototype, "objectId", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'type',
        required: true,
        example: 'go',
    }),
    __metadata("design:type", String)
], RouteStationResponseDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'name',
        required: true,
        example: '39',
    }),
    __metadata("design:type", String)
], RouteStationResponseDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Bus No. 39 (บางขันธ์ - อนุสาวรีย์ชัยสมรภูมิ)',
        required: true,
        example: '200',
    }),
    __metadata("design:type", String)
], RouteStationResponseDto.prototype, "description", void 0);
exports.default = RouteStationResponseDto;
//# sourceMappingURL=route-station-response.dto.js.map