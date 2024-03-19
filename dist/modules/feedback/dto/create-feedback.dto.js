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
class CreateFeedbackDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'หัวข้อ 1234',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'รายระเอียด.....',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2021-10-01T00:00:00+07:00',
    }),
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2021-10-01T00:00:00+07:00',
    }),
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "endDate", void 0);
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
    class_validator_1.IsObject(),
    __metadata("design:type", Array)
], CreateFeedbackDto.prototype, "questions", void 0);
exports.default = CreateFeedbackDto;
//# sourceMappingURL=create-feedback.dto.js.map