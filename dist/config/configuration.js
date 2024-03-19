"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
    authentication: {
        secret: process.env.SECRET_KEY || 'super_secret',
        jwtOptions: {
            header: {
                typ: 'access',
            },
            audience: 'tsb',
            issuer: 'nestjs',
            algorithm: 'HS256',
            expiresIn: '7d',
        },
        apiKey: process.env.SECRET,
    },
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
    database: {
        host: process.env.MONGODB_URI,
        options: {
            dbName: process.env.DB_NAME || 'tsb',
            w: 'majority',
            retryWrites: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        },
    },
});
//# sourceMappingURL=configuration.js.map