"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const cwlogger_service_1 = require("./cwlogger.service");
let LoggingInterceptor = class LoggingInterceptor {
    constructor() {
        this.logger = new cwlogger_service_1.CWLogger('LoggingInterceptor');
    }
    intercept(context, next) {
        const args = context.getArgs();
        const [req] = args;
        this.logger.log(`Incoming request with\n url:[${req.method}]${req.url}\n headers:${JSON.stringify(req.headers)} \n body:${JSON.stringify(req.body)}`);
        const now = Date.now();
        return next
            .handle()
            .pipe(operators_1.tap((data) => data ?
            this.logger.log(`Response outgoing with (${Date.now() - now}ms) data:[${JSON.stringify(data)}]`) : null));
    }
};
LoggingInterceptor = __decorate([
    common_1.Injectable()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logger.interceptor.js.map