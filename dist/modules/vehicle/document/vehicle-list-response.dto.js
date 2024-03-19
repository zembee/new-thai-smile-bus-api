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
class VehicleListResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'records',
        example: [
            [
                {
                    'route': null,
                    'registerNumber': null,
                    'brand': 'MINE BUS',
                    'motorNumber': 'MCS20111163',
                    'chassisNumber': 'MRSBCREM5MZM00016',
                    'number': null,
                    'name': '',
                    'objectId': 'r1pIhbmfViqsl5XNAlm8v',
                },
                {
                    'route': null,
                    'registerNumber': null,
                    'brand': 'MINE BUS',
                    'motorNumber': 'MCS20111180',
                    'chassisNumber': 'MRSBCREM0MZM00005',
                    'number': null,
                    'name': '',
                    'objectId': 'ONe40Szd3yp7eqS09Q6wR',
                },
            ],
        ],
    }),
    __metadata("design:type", Array)
], VehicleListResponseDto.prototype, "records", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'page',
        required: true,
        example: 1,
    }),
    __metadata("design:type", Number)
], VehicleListResponseDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'perPage',
        required: true,
        example: 20,
    }),
    __metadata("design:type", Number)
], VehicleListResponseDto.prototype, "perPage", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'จำนวนข้อมููลทั้งหมด',
        required: true,
        example: 20,
    }),
    __metadata("design:type", Number)
], VehicleListResponseDto.prototype, "count", void 0);
exports.default = VehicleListResponseDto;
//# sourceMappingURL=vehicle-list-response.dto.js.map