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
exports.AnnouncementController = void 0;
const common_1 = require("@nestjs/common");
const announcement_service_1 = require("./announcement.service");
const swagger_1 = require("@nestjs/swagger");
const common_response_decorator_1 = require("../../decorators/common-response.decorator");
const pagination_announcement_dto_1 = __importDefault(require("./dto/pagination-announcement.dto"));
const pagination_announcement_response_dto_1 = __importDefault(require("./dto/pagination-announcement-response.dto"));
const Module = 'Announcement';
let AnnouncementController = class AnnouncementController {
    async announcementPagination(query) {
        const { page = 1, perPage = 20, } = query;
        const { records, count } = await this.announcementService.pagination({ page, perPage });
        return Object.assign(Object.assign({}, query), { records,
            count });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", announcement_service_1.AnnouncementService)
], AnnouncementController.prototype, "announcementService", void 0);
__decorate([
    common_1.Get(''),
    swagger_1.ApiOperation({ 'summary': 'รายการประกาศ' }),
    common_response_decorator_1.CommonResponse(Module, { successType: pagination_announcement_response_dto_1.default }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_announcement_dto_1.default]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "announcementPagination", null);
AnnouncementController = __decorate([
    common_1.Controller('announcement')
], AnnouncementController);
exports.AnnouncementController = AnnouncementController;
//# sourceMappingURL=announcement.controller.js.map