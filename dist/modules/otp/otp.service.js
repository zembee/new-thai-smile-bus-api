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
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const otp_generator_1 = __importDefault(require("otp-generator"));
const axios_1 = __importDefault(require("axios"));
const nodemailer_1 = __importDefault(require("nodemailer"));
let OtpService = OtpService_1 = class OtpService {
    constructor(otpModel, configService) {
        this.otpModel = otpModel;
        this.configService = configService;
        this.logger = new cwlogger_service_1.CWLogger(OtpService_1.name);
    }
    getModel() {
        return this.otpModel;
    }
    async create(createBody) {
        return this.otpModel.create(createBody);
    }
    generateOtp() {
        const ref = otp_generator_1.default.generate(5, { upperCase: false, specialChars: false });
        let otp = Math.floor(100000 + Math.random() * 900000).toString();
        if (process.env.MOCK_OTP === '1') {
            otp = '111111';
        }
        return { ref, otp };
    }
    async sendSms(message, ref, telNo) {
        const headers = {
            'Content-Type': 'Application/json',
            'Accept-Charset': 'UTF8',
            'Authorization': 'Basic VFNCMDE6VFNCMTIzNCE=',
        };
        const data = {
            'SENDER': 'TSB Go',
            'TELNO': telNo,
            'MESSAGE': message,
            'REFNO': ref,
            'REMARK': '',
        };
        const url = 'https://tvdr-service.tvdirect.tv/ApiPartnerSMS-Test/Partner/SendSMS';
        await axios_1.default.post(url, data, { headers });
        return;
    }
    async sendEmail(message, ref, destination) {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'thaismilebus.tsb@gmail.com',
                pass: 'tHaismilebuspass',
            },
        });
        await transporter.sendMail({
            from: 'TSB Go',
            to: destination,
            subject: 'otp verify',
            text: message,
        });
    }
};
OtpService = OtpService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Otp')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map