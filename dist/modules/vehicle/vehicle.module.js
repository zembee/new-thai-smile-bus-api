"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleModule = void 0;
const common_1 = require("@nestjs/common");
const vehicle_controller_1 = require("./vehicle.controller");
const vehicle_service_1 = require("./vehicle.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_providers_1 = require("../../mongoose.providers");
const constants_1 = require("../../constants");
const vehicle_gateway_1 = require("./vehicle.gateway");
const route_module_1 = require("../route/route.module");
const route_service_1 = require("../route/route.service");
const station_service_1 = require("../station/station.service");
const station_module_1 = require("../station/station.module");
const schedule_1 = require("@nestjs/schedule");
let VehicleModule = class VehicleModule {
};
VehicleModule = __decorate([
    common_1.Module({
        imports: [
            route_module_1.RouteModule,
            station_module_1.StationModule,
            mongoose_1.MongooseModule.forFeature(mongoose_providers_1.models, constants_1.DB_CONNECTION_NAME),
            schedule_1.ScheduleModule.forRoot()
        ],
        controllers: [vehicle_controller_1.VehicleController],
        providers: [
            vehicle_service_1.VehicleService,
            vehicle_gateway_1.VehicleGateway,
            route_service_1.RouteService,
            station_service_1.StationService
        ],
        exports: [
            vehicle_service_1.VehicleService,
            vehicle_gateway_1.VehicleGateway,
        ],
    })
], VehicleModule);
exports.VehicleModule = VehicleModule;
//# sourceMappingURL=vehicle.module.js.map