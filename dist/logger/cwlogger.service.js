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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWLogger = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const chalk_1 = __importDefault(require("chalk"));
const winston = __importStar(require("winston"));
const formatter = info => {
    return `${dayjs_1.default(info.timestamp).format('YYYY/MM/DD - hh:mm:ss.SSS A')} [${info.level}] [${chalk_1.default.green(info.context)}] ${info.message}`;
};
const customFormat = winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.prettyPrint(), winston.format.printf(info => formatter(info)));
let CWLogger = class CWLogger extends common_1.Logger {
    constructor(ctx = 'Logger') {
        super(ctx);
        this.setContext(ctx);
        this.winstonLogger = winston.createLogger({
            level: 'silly',
            format: customFormat,
            transports: [
                new winston.transports.Console(),
            ],
        });
    }
    setContext(context) {
        super.setContext(context);
        this.ctx = context;
        return this;
    }
    silly(message) {
        this.winstonLog(message, 'silly');
    }
    debug(message) {
        this.winstonLog(message, 'debug');
    }
    log(message) {
        this.winstonLog(message, 'info');
    }
    warn(message) {
        this.winstonLog(message, 'warn');
    }
    error(message) {
        this.winstonLog(message, 'error');
    }
    winstonLog(message, level) {
        const entry = {
            level,
            message,
            context: this.ctx,
        };
        this.winstonLogger.log(entry);
    }
};
CWLogger = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], CWLogger);
exports.CWLogger = CWLogger;
//# sourceMappingURL=cwlogger.service.js.map