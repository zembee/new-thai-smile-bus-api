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
class UserResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'y_kR4zSxF03mA3o4oInJZ',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "objectId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '0632441234',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'abc@thaibusmile.com',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: ['user', 'driver', 'admin', 'superAdmin', 'master'],
    }),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "roles", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'tony',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'woodsome',
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: new Date(),
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "lastLogin", void 0);
exports.default = UserResponseDto;
//# sourceMappingURL=user-response.dto.js.map