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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("@nestjs/config");
const user_schema_1 = require("./user.schema");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const driver_timeline_schema_1 = require("./driver-timeline.schema");
let UserService = UserService_1 = class UserService {
    constructor(userModel, driverTimeline, configService) {
        this.userModel = userModel;
        this.driverTimeline = driverTimeline;
        this.configService = configService;
        this.logger = new cwlogger_service_1.CWLogger(UserService_1.name);
    }
    getModel() {
        return this.userModel;
    }
    async hashPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    async register(body) {
        const password = await this.hashPassword(body.password);
        const user = await this.userModel.create(Object.assign(Object.assign({}, body), { password }));
        return JSON.parse(JSON.stringify(user));
    }
    async getByEmail(email) {
        return this.userModel.findOne({ email }).select({ password: 0 }).lean();
    }
    async getByObjectId(objectId) {
        return this.userModel.findOne({ objectId }).select({ password: 0 }).lean();
    }
    async getByPhoneNumber(phoneNumber) {
        return this.userModel.findOne({ phoneNumber }).select({ password: 0 }).lean();
    }
    async getByPhoneNumberOrEmail(username) {
        return this.userModel.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: username },
                { phoneNumber: username },
            ],
        }).lean();
    }
    async update(user) {
        return this.userModel.updateOne({ objectId: user.objectId }, user);
    }
    async findOne(condition) {
        return this.userModel.findOne(condition).select({ password: 0 }).lean();
    }
    async createDriverTimeline(body) {
        return this.driverTimeline.create(body);
    }
    async getLatestDriverTimeline(user) {
        return this.driverTimeline.findOne({
            user,
            checkOut: null,
        }).sort({ createdAt: -1 }).lean();
    }
    async updateCheckOut(objectId) {
        return this.driverTimeline.updateOne({ objectId }, {
            $set: { checkOut: new Date() },
        });
    }
    async findDriverTimeline(query) {
        return this.driverTimeline.find(query).select({ bus: 0, user: 0 }).sort({ createdAt: -1 }).lean();
    }
};
UserService = UserService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __param(1, mongoose_1.InjectModel(driver_timeline_schema_1.DriverTimeline.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map