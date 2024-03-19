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
class ErrorMessage {
}
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        required: true,
        example: 400,
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ErrorMessage.prototype, "statusCode", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        required: true,
        example: 'Something is wrong',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ErrorMessage.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Object,
        required: false,
        example: {
            data: {},
        },
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], ErrorMessage.prototype, "data", void 0);
exports.default = ErrorMessage;
//# sourceMappingURL=error-message.dto.js.map