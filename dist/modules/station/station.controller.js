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
exports.StationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_response_decorator_1 = require("../../decorators/common-response.decorator");
const station_service_1 = require("./station.service");
const station_list_response_dto_1 = __importDefault(require("./document/station-list-response.dto"));
const station_linear_response_dto_1 = __importDefault(require("./document/station-linear-response.dto"));
const station_list_dto_1 = __importDefault(require("./dto/station-list.dto"));
const linear_station_dto_1 = __importDefault(require("./dto/linear-station.dto"));
const station_response_dto_1 = __importDefault(require("./document/station-response.dto"));
const station_transform_pipe_1 = require("./pipe/station-transform.pipe");
const Module = 'Station';
let StationController = class StationController {
    async stationList(queries) {
        const { search = '', lat = null, long = null, minRadius = null, maxRadius = null, quantity = null, } = queries;
        const query = { status: 'active' };
        if (search !== '') {
            query.$or = [
                { name: new RegExp(`.*${search}.*`, 'gi') },
                { description: new RegExp(`.*${search}.*`, 'gi') },
            ];
        }
        if (lat || long || minRadius || maxRadius || quantity) {
            query.location = {
                $near: {
                    $geometry: { type: 'Point', coordinates: [long, lat] },
                    $minDistance: minRadius,
                    $maxDistance: maxRadius,
                },
            };
        }
        return this.stationService.getModel().find(query).limit(quantity !== null && quantity !== void 0 ? quantity : 0).lean();
    }
    async StationLinearList(query) {
        const { station, route, } = query;
        const routes = await this.stationService.getStationLinear(station, route);
        return routes;
    }
    async getStation(station) {
        return station;
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", station_service_1.StationService)
], StationController.prototype, "stationService", void 0);
__decorate([
    common_1.Get(''),
    swagger_1.ApiOperation({ 'summary': 'รายการป้าย' }),
    common_response_decorator_1.CommonResponse(Module, { successType: station_list_response_dto_1.default }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [station_list_dto_1.default]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationList", null);
__decorate([
    common_1.Get('stationlinear'),
    swagger_1.ApiOperation({ 'summary': 'station linear' }),
    common_response_decorator_1.CommonResponse(Module, { successType: [station_linear_response_dto_1.default] }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [linear_station_dto_1.default]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "StationLinearList", null);
__decorate([
    common_1.Get(':objectId'),
    swagger_1.ApiOperation({ 'summary': 'ข้อมูลป้าย' }),
    common_response_decorator_1.CommonResponse(Module, { successType: station_response_dto_1.default }),
    swagger_1.ApiParam({ type: String, name: 'objectId' }),
    __param(0, common_1.Param(station_transform_pipe_1.StationTransformPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "getStation", null);
StationController = __decorate([
    common_1.Controller('station')
], StationController);
exports.StationController = StationController;
//# sourceMappingURL=station.controller.js.map