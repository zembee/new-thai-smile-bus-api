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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = __importDefault(require("./dto/create-user.dto"));
const user_response_dto_1 = __importDefault(require("./dto/user-response.dto"));
const common_response_decorator_1 = require("../../decorators/common-response.decorator");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const users_decorator_1 = require("./users.decorator");
const otp_service_1 = require("../otp/otp.service");
const update_user_dto_1 = __importDefault(require("./dto/update-user.dto"));
const update_password_dto_1 = __importDefault(require("./dto/update-password.dto"));
const driver_timeline_dto_1 = __importDefault(require("./dto/driver-timeline.dto"));
const driver_timeline_schema_1 = require("./driver-timeline.schema");
const reset_password_dto_1 = __importDefault(require("./dto/reset-password.dto"));
const vehicle_service_1 = require("../vehicle/vehicle.service");
const driver_timeline_list_dto_1 = __importDefault(require("./dto/driver-timeline-list.dto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Module = 'User';
let UserController = class UserController {
    async createBetTransaction(body) {
        const { phoneNumber = null, email = null, password, firstName, lastName, verifyCode, } = body;
        const isVerify = await this.otpService.getModel().findOne({
            verifyCode,
            isVerify: true,
        });
        if (!isVerify) {
            throw new common_1.BadRequestException({
                message: 'otp is not verify',
            });
        }
        if ((phoneNumber === '' || phoneNumber) && (email === '' && email)) {
            throw new common_1.BadRequestException({
                message: 'enter email or password.',
            });
        }
        if (phoneNumber !== '' && phoneNumber !== null) {
            const existPhoneNumber = await this.userService.getByPhoneNumber(phoneNumber);
            if (existPhoneNumber) {
                throw new common_1.BadRequestException({
                    message: 'phone number is exist.',
                    data: phoneNumber,
                });
            }
        }
        if (email !== '' && email !== null) {
            const existEmail = await this.userService.getByEmail(email);
            if (existEmail) {
                throw new common_1.BadRequestException({
                    message: 'email is exist.',
                    data: email,
                });
            }
        }
        try {
            return this.userService.register({
                phoneNumber,
                email,
                password,
                firstName,
                lastName,
            });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message || e);
        }
    }
    async me(user) {
        return user;
    }
    async updateInfo(user, body) {
        const findUser = await this.userService.getByObjectId(user.objectId);
        if (findUser.email) {
            delete body.email;
        }
        if (findUser.phoneNumber) {
            delete body.email;
        }
        if (body.phoneNumber && body.phoneNumber !== '') {
            const existPhoneNumber = await this.userService.getByPhoneNumber(body.phoneNumber);
            if (existPhoneNumber && existPhoneNumber.objectId !== user.objectId) {
                throw new common_1.BadRequestException({
                    message: 'phone number is exist.',
                    data: body.phoneNumber,
                });
            }
        }
        if (body.email && body.email !== '') {
            const existEmail = await this.userService.getByEmail(body.email);
            if (existEmail && existEmail.objectId !== user.objectId) {
                throw new common_1.BadRequestException({
                    message: 'email is exist.',
                    data: body.email,
                });
            }
        }
        const updateUser = Object.assign(Object.assign({}, findUser), body);
        await this.userService.update(updateUser);
        return Object.assign(Object.assign({}, findUser), body);
    }
    async updatePassword(user, body) {
        const { password, oldPassword, } = body;
        const existsUser = await this.userService.getModel().findOne({ objectId: user.objectId }).lean();
        const newPasswordHash = await this.userService.hashPassword(password);
        const isMatchPassword = await this.comparePassword(oldPassword, existsUser.password);
        if (!isMatchPassword) {
            throw new common_1.BadRequestException({ message: 'invalid old password.' });
        }
        try {
            existsUser.password = newPasswordHash;
            const updated = await this.userService.update(existsUser);
            return !!updated.nModified;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message || e);
        }
    }
    async deleteUser(objectId) {
        const users = await this.userService.getModel().findOne({ objectId }).lean();
        if (!users) {
            throw new common_1.BadRequestException({
                message: 'users not exists.',
            });
        }
        const del = await this.userService.getModel().deleteOne({ objectId });
        if (!!del.deletedCount) {
            return {
                status: true,
                message: 'users delete success.',
            };
        }
        else {
            return {
                status: false,
                message: 'users delete exists.',
            };
        }
    }
    async driverCheckIn(user, body) {
        const { action, bus, status, } = body;
        if (!user.roles.includes('driver') && !user.roles.includes('conductor') && !user.roles.includes('ticketer')) {
            throw new common_1.UnauthorizedException();
        }
        const createBody = {
            bus,
            status,
            user: user.objectId,
        };
        try {
            let driverTimeLine;
            if (action === 'check-out') {
                driverTimeLine = await this.userService.getLatestDriverTimeline(user.objectId);
                if (driverTimeLine) {
                    await this.userService.updateCheckOut(driverTimeLine.objectId);
                }
                await Promise.all([
                    this.userService.getModel().updateOne({ objectId: user.objectId }, { $set: { vehicle: null } }),
                    this.vehicleService.getModel().updateOne({ objectId: bus }, {
                        $set: {
                            employee: null,
                        },
                    }),
                ]);
                return driverTimeLine;
            }
            driverTimeLine = await this.userService.createDriverTimeline(Object.assign(Object.assign({}, createBody), { checkIn: new Date() }));
            await Promise.all([
                this.userService.getModel().updateOne({ objectId: user.objectId }, { $set: { vehicle: bus } }),
                this.vehicleService.getModel().updateOne({ objectId: bus }, {
                    $set: {
                        routeStatus: status,
                    },
                    $push: {
                        employee: user,
                    },
                }),
            ]);
            return driverTimeLine;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message || e);
        }
    }
    async driverTimeline(user, query) {
        const { startDate, endDate, } = query;
        if (!user.roles.includes('driver') && !user.roles.includes('conductor') && !user.roles.includes('ticketer')) {
            throw new common_1.UnauthorizedException();
        }
        let bus = null;
        if (user.vehicle) {
            bus = await this
                .vehicleService
                .getModel()
                .findOne({
                objectId: user.vehicle,
            }, {
                'speed': 1,
                'name': 1,
                'number': 1,
                'type': 1,
            })
                .lean();
        }
        bus = bus === null ? null : bus;
        try {
            const timeline = await this.userService.findDriverTimeline({
                user: user.objectId,
                createdAt: {
                    $gte: new Date(startDate * 1000),
                    $lte: new Date(endDate * 1000),
                },
            });
            return {
                bus,
                timeline,
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message || e);
        }
    }
    async resetPassword(body) {
        const { username, password, verifyCode, } = body;
        const isEmail = this.validateEmail(username);
        let user = await this.userService.getModel().findOne({ phoneNumber: username });
        if (isEmail) {
            user = await this.userService.getModel().findOne({ email: username });
        }
        if (!user) {
            throw new common_1.BadRequestException({
                message: 'user not found.',
            });
        }
        const isVerify = await this.otpService.getModel().findOne({
            verifyCode,
            isVerify: true,
        });
        if (!isVerify || isVerify.username !== username) {
            throw new common_1.BadRequestException({
                message: 'otp is not verify',
            });
        }
        try {
            const findUser = await this.userService.getByObjectId(user.objectId);
            const hashPassword = await this.userService.hashPassword(password);
            findUser.password = hashPassword;
            await this.userService.update(findUser);
            return true;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message || e);
        }
    }
    async comparePassword(original, hashed) {
        return bcrypt_1.default.compare(original, hashed);
    }
    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", otp_service_1.OtpService)
], UserController.prototype, "otpService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", vehicle_service_1.VehicleService)
], UserController.prototype, "vehicleService", void 0);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('register'),
    swagger_1.ApiOperation({ 'summary': 'สมัครสมาชิก **กรอกอีเมลล์หรือเบอร์โทรอย่างใดอย่างหนึ่งได้' }),
    common_response_decorator_1.CommonResponse(Module, { successType: user_response_dto_1.default }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createBetTransaction", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    common_1.Get('/me'),
    swagger_1.ApiOperation({ 'summary': 'ข้อมูลสมาชิก' }),
    common_response_decorator_1.CommonResponse(Module, { successType: user_response_dto_1.default }),
    __param(0, users_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_response_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    common_1.Put('/me'),
    swagger_1.ApiOperation({ 'summary': 'แก้ไขข้อมูลสมาชิก' }),
    common_response_decorator_1.CommonResponse(Module, { successType: user_response_dto_1.default }),
    __param(0, users_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_response_dto_1.default,
        update_user_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateInfo", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    common_1.Put('change-password'),
    swagger_1.ApiOperation({ 'summary': 'เปลี่ยนรหัสผ่าน' }),
    common_response_decorator_1.CommonResponse(Module, { successType: Boolean }),
    __param(0, users_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    common_1.Delete('/:objectId'),
    swagger_1.ApiOperation({ 'summary': 'ลบข้อมูลสมาชิก' }),
    common_response_decorator_1.CommonResponse(Module, { successType: Boolean }),
    swagger_1.ApiParam({ type: String, name: 'objectId' }),
    __param(0, common_1.Param('objectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    common_1.Post('driver/check-in'),
    swagger_1.ApiOperation({ 'summary': 'เข้า - ออกงาน' }),
    common_response_decorator_1.CommonResponse(Module, { successType: driver_timeline_schema_1.DriverTimeline }),
    __param(0, users_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, driver_timeline_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "driverCheckIn", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(200),
    common_1.Get('driver/timeline'),
    swagger_1.ApiOperation({ 'summary': 'ตารางเข้า - ออกงาน' }),
    common_response_decorator_1.CommonResponse(Module, { successType: driver_timeline_schema_1.DriverTimeline }),
    __param(0, users_decorator_1.User()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, driver_timeline_list_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "driverTimeline", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Put('reset-password'),
    swagger_1.ApiOperation({ 'summary': 'รีเซ็ตรหัสผ่าน' }),
    common_response_decorator_1.CommonResponse(Module, { successType: Boolean }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
UserController = __decorate([
    common_1.Controller('user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map