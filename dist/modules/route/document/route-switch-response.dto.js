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
class RouteSwitchResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'stations',
        required: true,
        example: '8aWgy2mSufJquQzIysk2j',
    }),
    __metadata("design:type", String)
], RouteSwitchResponseDto.prototype, "stations", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'routes',
        required: true,
        example: ['8aWgy2mSufJquQzIysk2j', 'czPpng17MA4yDN58xr2u3'],
    }),
    __metadata("design:type", Array)
], RouteSwitchResponseDto.prototype, "routes", void 0);
exports.default = RouteSwitchResponseDto;
//# sourceMappingURL=route-switch-response.dto.js.map