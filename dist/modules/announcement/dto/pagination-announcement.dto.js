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
class PaginationAnnouncementDto {
}
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        example: 1,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaginationAnnouncementDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        example: 20,
    }),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], PaginationAnnouncementDto.prototype, "perPage", void 0);
exports.default = PaginationAnnouncementDto;
//# sourceMappingURL=pagination-announcement.dto.js.map