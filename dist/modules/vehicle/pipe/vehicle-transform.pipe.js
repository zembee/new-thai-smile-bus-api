"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleTransformPipe = void 0;
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("../vehicle.service");
const station_service_1 = require("../../station/station.service");
const route_service_1 = require("../../route/route.service");
const sortBy_1 = __importDefault(require("lodash/sortBy"));
let VehicleTransformPipe = class VehicleTransformPipe {
    async transform(body) {
        var _a;
        const { objectId } = body;
        const vehicle = await this.busService.getModel().findOne({ objectId, status: 'active' }).select({ _id: 0 }).lean();
        if (!vehicle) {
            throw new common_1.BadRequestException({
                message: 'not found vehicle.',
            });
        }
        let route = (_a = await this.routeService.findByObjectId(vehicle.route)) !== null && _a !== void 0 ? _a : null;
        if (route) {
            const stations = await this.stationService.getStations(route);
            route = Object.assign(Object.assign({}, route), { stations: sortBy_1.default(stations, ['type', 'index']) });
        }
        return Object.assign(Object.assign({}, vehicle), { passengerCount: 10, wifiConnectCount: 5, route, employee: null });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", vehicle_service_1.VehicleService)
], VehicleTransformPipe.prototype, "busService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", station_service_1.StationService)
], VehicleTransformPipe.prototype, "stationService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", route_service_1.RouteService)
], VehicleTransformPipe.prototype, "routeService", void 0);
VehicleTransformPipe = __decorate([
    common_1.Injectable()
], VehicleTransformPipe);
exports.VehicleTransformPipe = VehicleTransformPipe;
//# sourceMappingURL=vehicle-transform.pipe.js.map