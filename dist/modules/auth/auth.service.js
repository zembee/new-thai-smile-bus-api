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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cwlogger_service_1 = require("../logger/cwlogger.service");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor() {
        this.logger = new cwlogger_service_1.CWLogger('Auth Service');
    }
    createToken(user) {
        const jwtOptions = {
            secret: this.configService.get('authentication.secret'),
        };
        return Object.assign({ refreshToken: null, accessToken: this.jwtService.sign({ id: user.objectId }, jwtOptions) }, user);
    }
    async createSocialToken(body) {
        var _a, _b, _c, _d, _e, _f;
        let email;
        let password;
        let appleId;
        let googleId;
        let facebookId;
        const payload = this.jwtService.decode(body.jwt);
        const identity = (_b = (_a = payload === null || payload === void 0 ? void 0 : payload.firebase) === null || _a === void 0 ? void 0 : _a.identities) !== null && _b !== void 0 ? _b : null;
        let user;
        try {
            if (identity === null || identity === void 0 ? void 0 : identity.hasOwnProperty('google.com')) {
                email = (_c = identity === null || identity === void 0 ? void 0 : identity.email[0]) !== null && _c !== void 0 ? _c : identity.email;
                password = identity['google.com'][0];
                googleId = identity['google.com'][0];
                user = await this.usersService.findOne({ googleId });
            }
            if (identity === null || identity === void 0 ? void 0 : identity.hasOwnProperty('facebook.com')) {
                if ((_d = identity === null || identity === void 0 ? void 0 : identity.email) === null || _d === void 0 ? void 0 : _d.length) {
                    email = identity.email[0];
                }
                email = (_e = identity === null || identity === void 0 ? void 0 : identity.email[0]) !== null && _e !== void 0 ? _e : `${identity['facebook.com'][0]}@facebook.com`;
                password = identity['facebook.com'][0];
                facebookId = identity['facebook.com'][0];
                user = await this.usersService.findOne({ facebookId });
            }
            if (identity === null || identity === void 0 ? void 0 : identity.hasOwnProperty('apple.com')) {
                email = `${identity['apple.com'][0]}@apple.com`;
                password = identity['apple.com'][0];
                appleId = identity['apple.com'][0];
                user = await this.usersService.findOne({ appleId });
            }
            if (!user) {
                user = await this.usersService.register({
                    email,
                    password,
                    appleId,
                    googleId,
                    facebookId,
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                });
            }
            await this.usersService.getModel().updateOne({ email }, { $set: { latestLogin: new Date() } });
            const jwtOptions = {
                secret: this.configService.get('authentication.secret'),
            };
            return Object.assign({ refreshToken: null, accessToken: this.jwtService.sign({ id: user.objectId }, jwtOptions), socialLogin: true }, user);
        }
        catch (e) {
            this.logger.error(`createSocialToken error ${(_f = e.message) !== null && _f !== void 0 ? _f : e}`);
            throw new common_1.UnauthorizedException({
                message: 'invalid jwt token',
                data: {},
            });
        }
    }
    async comparePassword(original, hashed) {
        return bcrypt_1.default.compare(original, hashed);
    }
    async validateUser(username, pass) {
        let user;
        try {
            user = await this.usersService.getByPhoneNumberOrEmail(username);
        }
        catch (error) {
            this.logger.error(`get user: ${JSON.stringify(error)}`);
            throw new common_1.UnauthorizedException({
                message: 'username or password is invalid',
                data: {},
            });
        }
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'username or password is invalid',
                data: {},
            });
        }
        if (user.status !== 'active') {
            throw new common_1.ForbiddenException();
        }
        const isMatchPassword = await this.comparePassword(pass, user.password);
        if (isMatchPassword) {
            user.latestLogin = new Date();
            await this.usersService.update(user);
            return user;
        }
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", cwlogger_service_1.CWLogger)
], AuthService.prototype, "logger", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", user_service_1.UserService)
], AuthService.prototype, "usersService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", jwt_1.JwtService)
], AuthService.prototype, "jwtService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", config_1.ConfigService)
], AuthService.prototype, "configService", void 0);
AuthService = __decorate([
    common_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map