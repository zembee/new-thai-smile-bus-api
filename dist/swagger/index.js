"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.setupSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Tsb Web API')
        .setDescription('Tsb Web API Document')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addServer('')
        .addServer('/api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
};
//# sourceMappingURL=index.js.map