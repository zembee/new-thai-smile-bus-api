"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCacheOptions = void 0;
const config_1 = require("@nestjs/config");
const redisStore = __importStar(require("cache-manager-redis-store"));
exports.RegisterCacheOptions = {
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => {
        return {
            store: redisStore,
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
            ttl: configService.get('cache_ttl') || 5,
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=cache.provicer.js.map