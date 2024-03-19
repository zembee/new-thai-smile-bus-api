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
var VehicleController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vehicle_service_1 = require("./vehicle.service");
const common_response_decorator_1 = require("../../decorators/common-response.decorator");
const vehicle_list_response_dto_1 = __importDefault(require("./document/vehicle-list-response.dto"));
const route_service_1 = require("../route/route.service");
const vehicle_transform_pipe_1 = require("./pipe/vehicle-transform.pipe");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const vehicle_gateway_1 = require("./vehicle.gateway");
const dayjs_1 = __importDefault(require("dayjs"));
const Module = 'Vehicle';
let VehicleController = VehicleController_1 = class VehicleController {
    constructor() {
        this.logger = new cwlogger_service_1.CWLogger(VehicleController_1.name);
    }
    async vehicleList(body) {
        const { lat = null, long = null, minRadius = null, maxRadius = null, } = body;
        const afkTime = dayjs_1.default().subtract(1, 'hour').toDate();
        const query = { status: 'active', updatedAt: { $gte: afkTime } };
        if (body.route) {
            query.route = body.route;
        }
        if (lat && long && minRadius && maxRadius) {
            query.location = {
                $near: {
                    $geometry: { type: 'Point', coordinates: [long, lat] },
                    $minDistance: minRadius,
                    $maxDistance: maxRadius,
                },
            };
        }
        return this.vehicleService.getModel().find(query).lean();
    }
    async getVehicle(vehicle) {
        return vehicle;
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", vehicle_service_1.VehicleService)
], VehicleController.prototype, "vehicleService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", route_service_1.RouteService)
], VehicleController.prototype, "routeService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", vehicle_gateway_1.VehicleGateway)
], VehicleController.prototype, "vehicleGatewayService", void 0);
__decorate([
    common_1.HttpCode(200),
    common_1.Post(''),
    swagger_1.ApiOperation({ 'summary': 'รายการพาหนะทั้งหมด' }),
    common_response_decorator_1.CommonResponse(Module, { successType: vehicle_list_response_dto_1.default }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "vehicleList", null);
__decorate([
    common_1.Get(':objectId'),
    swagger_1.ApiOperation({ 'summary': 'ข้อมูลพาหนะ' }),
    common_response_decorator_1.CommonResponse(Module, { successType: [] }),
    swagger_1.ApiParam({ type: String, name: 'objectId' }),
    __param(0, common_1.Param(vehicle_transform_pipe_1.VehicleTransformPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getVehicle", null);
VehicleController = VehicleController_1 = __decorate([
    common_1.Controller('vehicle')
], VehicleController);
exports.VehicleController = VehicleController;
//# sourceMappingURL=vehicle.controller.js.map