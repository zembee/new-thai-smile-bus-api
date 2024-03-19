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
exports.RouteTransformPipe = void 0;
const common_1 = require("@nestjs/common");
const route_service_1 = require("../route.service");
const station_service_1 = require("../../station/station.service");
const sortBy_1 = __importDefault(require("lodash/sortBy"));
let RouteTransformPipe = class RouteTransformPipe {
    async transform(body) {
        const { objectId: id } = body;
        const route = await this.routeService.findByObjectId(id);
        if (!route) {
            throw new common_1.BadRequestException({
                message: 'not found route.',
            });
        }
        let { stations } = route;
        stations = await Promise.all(stations.map(async (station) => {
            const { index, type, objectId } = station;
            const st = await this.stationService.findByObjectId(objectId);
            if (st) {
                const { name, description, location } = st;
                return {
                    name,
                    description,
                    location,
                    index,
                    type,
                    objectId,
                };
            }
        }));
        return Object.assign(Object.assign({}, route), { stations: sortBy_1.default(stations, ['type', 'index']), bus: {
                online: 10,
                offline: 3,
            }, employee: {
                online: 20,
                offline: 10,
            } });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", route_service_1.RouteService)
], RouteTransformPipe.prototype, "routeService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", station_service_1.StationService)
], RouteTransformPipe.prototype, "stationService", void 0);
RouteTransformPipe = __decorate([
    common_1.Injectable()
], RouteTransformPipe);
exports.RouteTransformPipe = RouteTransformPipe;
//# sourceMappingURL=route-transform.pipe.js.map