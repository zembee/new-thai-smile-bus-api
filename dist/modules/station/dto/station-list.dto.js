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
const class_transformer_1 = require("class-transformer");
class StationListDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'หาจากชื่อป้าย / รายระเอียด',
        required: false,
        example: '',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], StationListDto.prototype, "search", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'หาจากตำแหน่ง (lat)',
        required: false,
        example: 10.003,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], StationListDto.prototype, "lat", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'หาจากตำแหน่ง (long)',
        required: false,
        example: 10.003,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], StationListDto.prototype, "long", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'จำนวนป้ายที่ต้องการ',
        required: false,
        example: 10,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StationListDto.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'รัศมี ใกล้สุด x เมตร',
        required: false,
        example: 1000,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StationListDto.prototype, "minRadius", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'รัศมี ไกลสุด x เมตร',
        required: false,
        example: 5000,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StationListDto.prototype, "maxRadius", void 0);
exports.default = StationListDto;
//# sourceMappingURL=station-list.dto.js.map