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
class CreateFeedbackResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'หัวข้อ 1234',
    }),
    __metadata("design:type", String)
], CreateFeedbackResponseDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'active',
    }),
    __metadata("design:type", String)
], CreateFeedbackResponseDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'รายระเอียด.....',
    }),
    __metadata("design:type", String)
], CreateFeedbackResponseDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: new Date(),
    }),
    __metadata("design:type", String)
], CreateFeedbackResponseDto.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: new Date(),
    }),
    __metadata("design:type", String)
], CreateFeedbackResponseDto.prototype, "endDate", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                type: 'star',
                question: 'คำถาม 1',
                index: 1,
                choices: [
                    {
                        value: 1,
                    },
                    {
                        value: 2,
                    },
                    {
                        value: 3,
                    },
                    {
                        value: 4,
                    },
                    {
                        value: 5,
                    },
                ],
            },
            {
                type: 'choice',
                question: 'คำถาม 2',
                index: 2,
                choices: [
                    {
                        value: 'คำตอบ 1',
                    },
                    {
                        value: 'คำตอบ 2',
                    },
                ],
            },
            {
                type: 'freeText',
                question: 'คำถาม 3',
                index: 3,
                choices: [],
            },
        ],
    }),
    __metadata("design:type", Array)
], CreateFeedbackResponseDto.prototype, "questions", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                createdAt: new Date(),
                user: '1234',
                answers: [{
                        value: 1,
                        questionIndex: 1,
                    }]
            }
        ],
    }),
    __metadata("design:type", Array)
], CreateFeedbackResponseDto.prototype, "answers", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '',
    }),
    __metadata("design:type", String)
], CreateFeedbackResponseDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '',
    }),
    __metadata("design:type", String)
], CreateFeedbackResponseDto.prototype, "updatedBy", void 0);
exports.default = CreateFeedbackResponseDto;
//# sourceMappingURL=create-feedback-response.dto.js.map