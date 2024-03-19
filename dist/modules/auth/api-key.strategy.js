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
exports.ApiKeyStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const passport_headerapikey_1 = require("passport-headerapikey");
let ApiKeyStrategy = class ApiKeyStrategy extends passport_1.PassportStrategy(passport_headerapikey_1.HeaderAPIKeyStrategy, 'api-key') {
    constructor(configService) {
        super({ header: 'X-Api-Key', 'prefix': '' }, true, async (payload, done) => {
            try {
                const apiKey = this.configService.get('authentication.apiKey');
                if (payload !== apiKey) {
                    return done(null);
                }
                return done(null, payload);
            }
            catch (e) {
                return done(null);
            }
        });
        this.configService = configService;
    }
};
ApiKeyStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiKeyStrategy);
exports.ApiKeyStrategy = ApiKeyStrategy;
//# sourceMappingURL=api-key.strategy.js.map