"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const config_1 = require("@nestjs/config");
const socket_io_redis_1 = __importDefault(require("socket.io-redis"));
const common_1 = require("@nestjs/common");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
        this.configService = app.get(config_1.ConfigService);
        this.logger = new common_1.Logger('RedisIoAdapter');
    }
    createIOServer(port, options) {
        this.logger.log(`Create io server with redis info ${JSON.stringify(this.configService.get('redis'))}`);
        const server = super.createIOServer(port, options);
        const redisAdapter = socket_io_redis_1.default({
            host: this.configService.get('redis.host') || 'localhost',
            port: this.configService.get('redis.port') || 6379,
            password: this.configService.get('redis.password') || undefined,
        });
        server.adapter(redisAdapter);
        return server;
    }
    create(port, options = {}) {
        this.server = this.createIOServer(port, options);
        this.server.use(async (socket, next) => {
            var _a, _b;
            const token = ((_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.token) || ((_b = socket.handshake.headers) === null || _b === void 0 ? void 0 : _b.authorization);
            if (!token) {
                return next();
            }
            try {
                socket.headers = {
                    authorization: `Bearer ${token}`,
                };
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
        return this.server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis-io.adapter.js.map