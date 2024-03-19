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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const nestjs_rate_limit_1 = require("nestjs-rate-limit");
const local_auth_guard_1 = require("./local-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const auth_local_dto_1 = require("./dto/auth-local.dto");
const social_auth_dto_1 = require("./dto/social-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return this.authService.createToken(req.user);
    }
    async loginSocial(body) {
        return this.authService.createSocialToken(body);
    }
};
__decorate([
    nestjs_rate_limit_1.RateLimit({
        points: 5,
        pointsConsumed: 1,
    }),
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiTags('Authentication'),
    swagger_1.ApiOkResponse({ description: 'Login Complete' }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid email or password' }),
    swagger_1.ApiTooManyRequestsResponse({ description: 'Too many requests' }),
    common_1.Post('/login'),
    swagger_1.ApiBody({ type: auth_local_dto_1.AuthLocalDto }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    nestjs_rate_limit_1.RateLimit({
        points: 5,
        pointsConsumed: 1,
    }),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiTags('Authentication'),
    swagger_1.ApiOkResponse({ description: 'Login Complete' }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid email or password' }),
    swagger_1.ApiTooManyRequestsResponse({ description: 'Too many requests' }),
    common_1.Post('/login/social/'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_auth_dto_1.SocialAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginSocial", null);
AuthController = __decorate([
    common_1.Controller('authentication'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map