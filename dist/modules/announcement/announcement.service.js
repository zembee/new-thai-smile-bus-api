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
var AnnouncementService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const announcement_schema_1 = require("./announcement.schema");
const cwlogger_service_1 = require("../logger/cwlogger.service");
let AnnouncementService = AnnouncementService_1 = class AnnouncementService {
    constructor(AnnouncementModel) {
        this.AnnouncementModel = AnnouncementModel;
        this.logger = new cwlogger_service_1.CWLogger(AnnouncementService_1.name);
    }
    getModel() {
        return this.AnnouncementModel;
    }
    async pagination(query = {
        page: 1,
        perPage: 20,
    }, select = {}) {
        var _a, _b;
        const { page, perPage } = query;
        try {
            const pCount = this.AnnouncementModel
                .countDocuments({
                endDate: {
                    $gte: new Date()
                }
            });
            const pRecord = this.AnnouncementModel
                .find({
                endDate: {
                    $gte: new Date()
                }
            })
                .select(select)
                .sort({ createdAt: -1 })
                .skip((page - 1) * (+perPage))
                .limit(+perPage)
                .lean();
            const [records, count] = await mongoose_2.Promise.all([pRecord, pCount]);
            return {
                records,
                count,
            };
        }
        catch (e) {
            this.logger.error(`pagination cat on  ${(_a = e.message) !== null && _a !== void 0 ? _a : e}`);
            throw new common_1.InternalServerErrorException({ message: (_b = e.message) !== null && _b !== void 0 ? _b : e });
        }
    }
};
AnnouncementService = AnnouncementService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(announcement_schema_1.Announcement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnnouncementService);
exports.AnnouncementService = AnnouncementService;
//# sourceMappingURL=announcement.service.js.map