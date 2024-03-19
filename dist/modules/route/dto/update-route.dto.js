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
const class_transformer_1 = require("class-transformer");
const station_dto_1 = __importDefault(require("./station.dto"));
class UpdateRouteDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: '120',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRouteDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        enum: ['active', 'disabled'],
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsEnum(['active', 'disabled']),
    __metadata("design:type", String)
], UpdateRouteDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateRouteDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                index: 0,
                objectId: 'czPpng17MA4yDN58xr2u3',
                type: 'go',
            },
        ],
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => station_dto_1.default),
    __metadata("design:type", Array)
], UpdateRouteDto.prototype, "stations", void 0);
exports.default = UpdateRouteDto;
//# sourceMappingURL=update-route.dto.js.map