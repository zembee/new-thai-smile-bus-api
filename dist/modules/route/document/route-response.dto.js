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
class RouteResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: '8aWgy2mSufJquQzIysk2j',
    }),
    __metadata("design:type", String)
], RouteResponseDto.prototype, "objectId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '120',
    }),
    __metadata("design:type", String)
], RouteResponseDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'Bus No. 120 (มหาชัยเมืองใหม่ - คลองสาน)',
    }),
    __metadata("design:type", String)
], RouteResponseDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'active',
    }),
    __metadata("design:type", String)
], RouteResponseDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [{
                online: 10,
                offline: 2,
            }],
    }),
    __metadata("design:type", Object)
], RouteResponseDto.prototype, "bus", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [{
                online: 18,
                offline: 1,
            }],
    }),
    __metadata("design:type", Object)
], RouteResponseDto.prototype, "employee", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [{
                index: 0,
                name: 'ป้ายรถประจำทาง ตรงข้ามซอยพระราชวิริยาภรณ์ 16',
                location: {
                    type: 'Point',
                    coordinates: [
                        100.521831,
                        13.667928,
                    ],
                },
                type: 'go',
                objectId: 'czPpng17MA4yDN58xr2u3',
            }],
    }),
    __metadata("design:type", Array)
], RouteResponseDto.prototype, "stations", void 0);
exports.default = RouteResponseDto;
//# sourceMappingURL=route-response.dto.js.map