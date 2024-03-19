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
class FeedbackListResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'records',
        example: [
            {
                "objectId": "1234",
                "title": "หัวข้อ 1234",
                "status": "active",
                "description": "รายระเอียด.....",
                "startDate": "2021-12-06T05:55:30.803Z",
                "endDate": "2021-12-06T05:55:30.803Z",
                "questions": [
                    {
                        "type": "star",
                        "question": "คำถาม 1",
                        "index": 1,
                        "choices": [
                            {
                                "value": 1
                            },
                            {
                                "value": 2
                            },
                            {
                                "value": 3
                            },
                            {
                                "value": 4
                            },
                            {
                                "value": 5
                            }
                        ]
                    },
                    {
                        "type": "choice",
                        "question": "คำถาม 2",
                        "index": 2,
                        "choices": [
                            {
                                "value": "คำตอบ 1"
                            },
                            {
                                "value": "คำตอบ 2"
                            }
                        ]
                    },
                    {
                        "type": "freeText",
                        "question": "คำถาม 3",
                        "index": 3,
                        "choices": []
                    }
                ],
                "answers": [
                    {
                        "createdAt": "2021-12-06T05:55:30.803Z",
                        "user": "1234",
                        "answers": [
                            {
                                "value": 1,
                                "questionIndex": 1
                            }
                        ]
                    }
                ],
                "createdBy": "",
                "updatedBy": ""
            }
        ],
    }),
    __metadata("design:type", Array)
], FeedbackListResponseDto.prototype, "records", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'page',
        required: true,
        example: 1,
    }),
    __metadata("design:type", Number)
], FeedbackListResponseDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'perPage',
        required: true,
        example: 20,
    }),
    __metadata("design:type", Number)
], FeedbackListResponseDto.prototype, "perPage", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'จำนวนข้อมูล',
        required: true,
        example: 100,
    }),
    __metadata("design:type", Number)
], FeedbackListResponseDto.prototype, "count", void 0);
exports.default = FeedbackListResponseDto;
//# sourceMappingURL=feedback-list-response.dto.js.map