"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const error_message_dto_1 = __importDefault(require("../dto/error-message.dto"));
function CommonResponse(tag, { successType }) {
    return common_1.applyDecorators(swagger_1.ApiTags(tag), swagger_1.ApiResponse({
        status: 200,
        description: 'Success',
        type: successType,
    }), swagger_1.ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: error_message_dto_1.default,
    }), swagger_1.ApiResponse({
        status: 401,
        description: 'Unauthorized',
        type: error_message_dto_1.default,
    }), swagger_1.ApiResponse({
        status: 500,
        description: 'Internal Error',
        type: error_message_dto_1.default,
    }));
}
exports.CommonResponse = CommonResponse;
//# sourceMappingURL=common-response.decorator.js.map