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
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_response_decorator_1 = require("../../decorators/common-response.decorator");
const otp_service_1 = require("./otp.service");
const dayjs_1 = __importDefault(require("dayjs"));
const otp_email_response_dto_1 = __importDefault(require("./dto/otp-email-response.dto"));
const otp_phone_response_dto_1 = __importDefault(require("./dto/otp-phone-response.dto"));
const verify_otp_dto_1 = __importDefault(require("./dto/verify-otp.dto"));
const user_service_1 = require("../user/user.service");
const Module = 'Otp';
let OtpController = class OtpController {
    async requestPhoneOtp(param) {
        const { phoneNumber } = param;
        const { ref, otp } = await this.otpService.generateOtp();
        const createBody = {
            username: phoneNumber,
            verifyCode: ref,
            verifyNumber: otp,
            isVerify: false,
            expire: dayjs_1.default().add(5, 'minute').toDate(),
        };
        await this.otpService.create(createBody);
        const message = `OTP = ${otp} [รหัสอ้างอิง : ${ref} ] เพื่อทำการยืนยันผ่าน TSB Go`;
        await this.otpService.sendSms(message, ref, phoneNumber);
        return {
            verifyCode: ref,
            phoneNumber,
        };
    }
    async requestPhoneOtpResetPass(param) {
        const { phoneNumber } = param;
        const user = await this.userService.getByPhoneNumber(phoneNumber);
        if (!user) {
            throw new common_1.BadRequestException({
                message: 'not found user.',
            });
        }
        const { ref, otp } = await this.otpService.generateOtp();
        const createBody = {
            username: phoneNumber,
            verifyCode: ref,
            verifyNumber: otp,
            isVerify: false,
            expire: dayjs_1.default().add(5, 'minute').toDate(),
        };
        await this.otpService.create(createBody);
        const message = `OTP = ${otp} [รหัสอ้างอิง : ${ref} ] เพื่อทำการยืนยันผ่าน TSB Go`;
        await this.otpService.sendSms(message, ref, phoneNumber);
        return {
            verifyCode: ref,
            phoneNumber,
        };
    }
    async requestEmailOtp(param) {
        const { email } = param;
        const { ref, otp } = await this.otpService.generateOtp();
        const createBody = {
            username: email,
            verifyCode: ref,
            verifyNumber: otp,
            isVerify: false,
            expire: dayjs_1.default().add(5, 'minute').toDate(),
        };
        await this.otpService.create(createBody);
        const message = `OTP = ${otp} [รหัสอ้างอิง : ${ref} ] เพื่อทำการยืนยันผ่าน TSB Go`;
        await this.otpService.sendEmail(message, ref, email);
        return {
            verifyCode: ref,
            email,
        };
    }
    async verifyOtp(params, body) {
        const otp = await this.otpService.getModel().findOne({
            username: params.username,
            verifyCode: body.verifyCode,
            verifyNumber: body.verifyNumber,
            expire: {
                $gte: dayjs_1.default().toDate(),
            },
        });
        if (!otp) {
            throw new common_1.BadRequestException({
                message: 'invalid otp or expired',
            });
        }
        await this.otpService.getModel().updateOne({
            username: params.username,
            verifyCode: body.verifyCode,
            verifyNumber: body.verifyNumber,
        }, { isVerify: true });
        return true;
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", otp_service_1.OtpService)
], OtpController.prototype, "otpService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", user_service_1.UserService)
], OtpController.prototype, "userService", void 0);
__decorate([
    common_1.Get('/request-phone-otp/:phoneNumber'),
    swagger_1.ApiOperation({ 'summary': 'ขอ otp (phone number)' }),
    swagger_1.ApiParam({ name: 'phoneNumber', type: String, required: true }),
    common_response_decorator_1.CommonResponse(Module, { successType: otp_phone_response_dto_1.default }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "requestPhoneOtp", null);
__decorate([
    common_1.Get('/otp-reset-pass/:phoneNumber'),
    swagger_1.ApiOperation({ 'summary': 'ขอ otp (phone number resetpass)' }),
    swagger_1.ApiParam({ name: 'phoneNumber', type: String, required: true }),
    common_response_decorator_1.CommonResponse(Module, { successType: otp_phone_response_dto_1.default }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "requestPhoneOtpResetPass", null);
__decorate([
    common_1.Get('/request-email-otp/:email'),
    swagger_1.ApiOperation({ 'summary': 'ขอ otp (email)' }),
    common_response_decorator_1.CommonResponse(Module, { successType: otp_email_response_dto_1.default }),
    swagger_1.ApiParam({ name: 'email', type: String, required: true }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "requestEmailOtp", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('/verify/:username'),
    swagger_1.ApiOperation({ 'summary': 'ยืนยัน otp (username = email , phoneNumber)' }),
    common_response_decorator_1.CommonResponse(Module, { successType: { isVerify: Boolean } }),
    swagger_1.ApiParam({ name: 'username', type: String, required: true }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_otp_dto_1.default]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "verifyOtp", null);
OtpController = __decorate([
    common_1.Controller('otp')
], OtpController);
exports.OtpController = OtpController;
//# sourceMappingURL=otp.controller.js.map