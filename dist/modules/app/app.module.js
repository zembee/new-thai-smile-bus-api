"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("../auth/auth.module");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const logger_module_1 = require("../logger/logger.module");
const configuration_1 = __importDefault(require("../../config/configuration"));
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../constants");
const user_module_1 = require("../user/user.module");
const route_module_1 = require("../route/route.module");
const announcement_module_1 = require("../announcement/announcement.module");
const vehicle_module_1 = require("../vehicle/vehicle.module");
const station_module_1 = require("../station/station.module");
const otp_module_1 = require("../otp/otp.module");
const feedback_module_1 = require("../feedback/feedback.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                connectionName: constants_1.DB_CONNECTION_NAME,
                useFactory: async (configService) => {
                    let mongoUri;
                    if (['testing', 'test'].includes(process.env.NODE_ENV)) {
                        const { MongoMemoryServer } = require('mongodb-memory-server');
                        const mongodb = new MongoMemoryServer();
                        mongoUri = await mongodb.getUri();
                    }
                    else {
                        mongoUri = configService.get('database.host');
                    }
                    return Object.assign({ uri: mongoUri }, configService.get('database.options'));
                },
            }),
            auth_module_1.AuthModule,
            announcement_module_1.AnnouncementModule,
            logger_module_1.LoggerModule,
            route_module_1.RouteModule,
            vehicle_module_1.VehicleModule,
            station_module_1.StationModule,
            user_module_1.UserModule,
            otp_module_1.OtpModule,
            feedback_module_1.FeedbackModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            cwlogger_service_1.CWLogger,
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map