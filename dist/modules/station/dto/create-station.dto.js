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
const class_validator_1 = require("class-validator");
const location_dto_1 = __importDefault(require("./location.dto"));
const class_transformer_1 = require("class-transformer");
class CreateStationDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'ป้ายรถประจำทาง ไอคอนสยาม',
        description: 'ชื่อ',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateStationDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'ป้ายรถประจำทาง ไอคอนสยาม',
        description: 'รายระเอียด',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateStationDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'type': 'Point',
            'coordinates': [
                100.509187,
                13.726264,
            ],
        },
        description: 'ตำแหน่ง',
    }),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => location_dto_1.default),
    __metadata("design:type", location_dto_1.default)
], CreateStationDto.prototype, "location", void 0);
exports.default = CreateStationDto;
//# sourceMappingURL=create-station.dto.js.map