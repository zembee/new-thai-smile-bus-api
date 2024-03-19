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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_response_decorator_1 = require("../../decorators/common-response.decorator");
const route_service_1 = require("./route.service");
const route_list_response_dto_1 = __importDefault(require("./document/route-list-response.dto"));
const route_transform_pipe_1 = require("./pipe/route-transform.pipe");
const route_response_dto_1 = __importDefault(require("./document/route-response.dto"));
const station_service_1 = require("../station/station.service");
const sortBy_1 = __importDefault(require("lodash/sortBy"));
const route_destination_dto_1 = __importDefault(require("./dto/route-destination.dto"));
const route_station_response_dto_1 = __importDefault(require("./document/route-station-response.dto"));
const route_switch_dto_1 = __importDefault(require("./dto/route-switch.dto"));
const route_switch_response_dto_1 = __importDefault(require("./document/route-switch-response.dto"));
const Module = 'Route';
let RouteController = class RouteController {
    async routeList(body) {
        const { objectId = null } = body;
        const query = { status: 'active' };
        const route = await this.routeService.findRouteStaion(objectId);
        return route;
    }
    async routeListFromDestination(body) {
        const { origin, destination } = body;
        const query = { status: 'active' };
        query['stations.objectId'] = origin,
            query['stations.objectId'] = destination;
        let routes = await this.routeService
            .getModel()
            .find(query)
            .select({ _id: 0, objectId: 1, name: 1, description: 1, stations: 1 })
            .sort({ name: 1 })
            .lean();
        if (routes.length) {
            routes = await Promise.all(routes.map(async (route) => {
                let { stations } = route;
                stations = sortBy_1.default(stations, ['type', 'index']);
                stations = stations.splice(stations.findIndex((s) => s.objectId === origin), stations.findIndex((s) => s.objectId === destination) + 1);
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
                return Object.assign(Object.assign({}, route), { stations });
            }));
        }
        return routes;
    }
    async routeOriginDestinationList(query) {
        const { origin, destination, } = query;
        const route = await this.routeService.findinObjectId(origin, destination);
        return route;
    }
    async routeSwitchList(query, routeArray) {
        const { stations, routes, } = query;
        if (!Array.isArray(routes)) {
            routeArray = Array(routes);
        }
        else {
            routeArray = routes;
        }
        const route = await this.routeService.findRouteStaionSwitch(stations, routeArray);
        return route;
    }
    async getRoute(route) {
        return route;
    }
    async getRouteStation(params) {
        const { objectId = '' } = params;
        if (objectId === '') {
            throw new common_1.BadRequestException({
                message: 'not found route.',
            });
        }
        else {
            const route = await this.routeService.findStaion(objectId);
            return route;
        }
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", route_service_1.RouteService)
], RouteController.prototype, "routeService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", station_service_1.StationService)
], RouteController.prototype, "stationService", void 0);
__decorate([
    common_1.Post(''),
    swagger_1.ApiOperation({ 'summary': 'รายการเส้นทาง' }),
    common_response_decorator_1.CommonResponse(Module, { successType: [route_list_response_dto_1.default] }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "routeList", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('search'),
    swagger_1.ApiOperation({ 'summary': 'รายการเส้นทาง (จาก สถานีต้นทาง - ปลายทาง)' }),
    common_response_decorator_1.CommonResponse(Module, { successType: [route_list_response_dto_1.default] }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [route_destination_dto_1.default]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "routeListFromDestination", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Get('search'),
    swagger_1.ApiOperation({ 'summary': 'รายการเส้นทาง (จาก สถานีต้นทาง - ปลายทาง)' }),
    common_response_decorator_1.CommonResponse(Module, { successType: [route_destination_dto_1.default] }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [route_destination_dto_1.default]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "routeOriginDestinationList", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Get('routeswitch'),
    swagger_1.ApiOperation({ 'summary': 'switch สายรถ' }),
    common_response_decorator_1.CommonResponse(Module, { successType: [route_switch_response_dto_1.default] }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [route_switch_dto_1.default, Array]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "routeSwitchList", null);
__decorate([
    common_1.Get(':objectId'),
    swagger_1.ApiOperation({ 'summary': 'ข้อมูลเส้นทาง' }),
    common_response_decorator_1.CommonResponse(Module, { successType: route_response_dto_1.default }),
    swagger_1.ApiParam({ type: String, name: 'objectId' }),
    __param(0, common_1.Param(route_transform_pipe_1.RouteTransformPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getRoute", null);
__decorate([
    common_1.Get('station/:objectId'),
    swagger_1.ApiOperation({ summary: 'ค้นหาข้อมูลเส้นทางโดยสถานี' }),
    common_response_decorator_1.CommonResponse(Module, { successType: [route_station_response_dto_1.default] }),
    swagger_1.ApiParam({ type: String, name: 'objectId' }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getRouteStation", null);
RouteController = __decorate([
    common_1.Controller('route')
], RouteController);
exports.RouteController = RouteController;
//# sourceMappingURL=route.controller.js.map