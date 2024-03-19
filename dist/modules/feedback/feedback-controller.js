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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_response_decorator_1 = require("../../decorators/common-response.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const feedback_service_1 = require("./feedback-service");
const create_feedback_response_dto_1 = __importDefault(require("./dto/create-feedback-response.dto"));
const users_decorator_1 = require("../user/users.decorator");
const feedback_list_response_dto_1 = __importDefault(require("./dto/feedback-list-response.dto"));
const update_feedback_response_dto_1 = __importDefault(require("./dto/update-feedback-response.dto"));
const pagination_announcement_dto_1 = __importDefault(require("../announcement/dto/pagination-announcement.dto"));
const Module = 'Feedback';
let FeedbackController = class FeedbackController {
    async feedbackList(user, query) {
        const { page = 1, perPage = 20, } = query;
        const [records, count] = await Promise.all([
            this.feedbackService
                .getModel()
                .findOne({ status: 'active' })
                .sort({ createdAt: -1 })
                .limit(1),
            this.feedbackService.getModel().countDocuments({
                startDate: {
                    $lte: new Date(),
                },
                endDate: {
                    $gte: new Date(),
                },
            }),
        ]);
        return {
            records: [records],
            count,
            page,
            perPage,
        };
    }
    async updateFeedback(user, body, objectId, userNames) {
        const { answers, } = body;
        const feedback = await this.feedbackService.getModel().findOne({ objectId }).lean();
        if (!feedback) {
            throw new common_1.BadRequestException({
                message: 'feedback not exists.',
            });
        }
        await this.feedbackService.getModel().updateOne({ objectId }, {
            $push: {
                answers: {
                    user: userNames !== null && userNames !== void 0 ? userNames : 'guest',
                    createdAt: new Date(),
                    answers,
                },
            },
        });
        return answers;
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", feedback_service_1.FeedbackService)
], FeedbackController.prototype, "feedbackService", void 0);
__decorate([
    common_1.Get(''),
    swagger_1.ApiOperation({ 'summary': 'รายการ feedback' }),
    common_1.SetMetadata('skipAuth', true),
    common_response_decorator_1.CommonResponse(Module, { successType: feedback_list_response_dto_1.default }),
    __param(0, users_decorator_1.User()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_announcement_dto_1.default]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "feedbackList", null);
__decorate([
    common_1.Put('/:objectId/:userNames'),
    swagger_1.ApiOperation({ 'summary': 'ตอบคำถาม' }),
    common_1.SetMetadata('skipAuth', true),
    common_response_decorator_1.CommonResponse(Module, { successType: create_feedback_response_dto_1.default }),
    swagger_1.ApiParam({ type: String, name: 'objectId' }),
    swagger_1.ApiParam({ type: String, name: 'userNames' }),
    __param(0, users_decorator_1.User()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param('objectId')),
    __param(3, common_1.Param('userNames')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_feedback_response_dto_1.default, String, String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "updateFeedback", null);
FeedbackController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('feedback')
], FeedbackController);
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=feedback-controller.js.map