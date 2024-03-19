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
class VehicleListDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'ชื่อพาหนะหรือป้ายทะเบียน',
        required: false,
        example: '',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VehicleListDto.prototype, "search", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'ประเภท',
        required: false,
        enum: ['bus', 'taxi', 'van'],
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsIn(['bus', 'taxi', 'van']),
    __metadata("design:type", String)
], VehicleListDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'page',
        required: true,
        example: 1,
    }),
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], VehicleListDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'perPage',
        required: true,
        example: 20,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.Max(100),
    __metadata("design:type", Number)
], VehicleListDto.prototype, "perPage", void 0);
exports.default = VehicleListDto;
//# sourceMappingURL=vehicle-list.dto.js.map