"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationModule = void 0;
const common_1 = require("@nestjs/common");
const station_service_1 = require("./station.service");
const route_service_1 = require("../route/route.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_providers_1 = require("../../mongoose.providers");
const constants_1 = require("../../constants");
const station_controller_1 = require("./station.controller");
let StationModule = class StationModule {
};
StationModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature(mongoose_providers_1.models, constants_1.DB_CONNECTION_NAME)],
        controllers: [station_controller_1.StationController],
        providers: [
            station_service_1.StationService,
            route_service_1.RouteService
        ],
        exports: [
            station_service_1.StationService,
            route_service_1.RouteService
        ],
    })
], StationModule);
exports.StationModule = StationModule;
//# sourceMappingURL=station.module.js.map