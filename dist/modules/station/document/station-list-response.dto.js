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
class StationListResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'records',
        example: [
            {
                "updateBy": null,
                "createdBy": "superadmin@tsb.com",
                "status": "active",
                "name": "ป้ายรถประจำทาง ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ 32/2",
                "description": "ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ32/2,ตรงข้ามธนาคารกสิกรไทย,ถนนราษฎร์บูรณะ เขตราษฎร์บูรณะ แขวงราษฎร์บูรณะ กรุงเทพมหานคร 10140",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        100.513886,
                        13.677417
                    ]
                },
                "createdAt": new Date("2021-09-20T18:57:28.975Z"),
                "updatedAt": new Date("2021-09-20T18:57:28.975Z"),
                "objectId": "r-SQWiihXS1ATbXYbVdmk"
            },
        ],
    }),
    __metadata("design:type", Array)
], StationListResponseDto.prototype, "records", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'page',
        required: true,
        example: 1,
    }),
    __metadata("design:type", Number)
], StationListResponseDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'perPage',
        required: true,
        example: 20,
    }),
    __metadata("design:type", Number)
], StationListResponseDto.prototype, "perPage", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'จำนวนข้อมูล',
        required: true,
        example: 100,
    }),
    __metadata("design:type", Number)
], StationListResponseDto.prototype, "count", void 0);
exports.default = StationListResponseDto;
//# sourceMappingURL=station-list-response.dto.js.map