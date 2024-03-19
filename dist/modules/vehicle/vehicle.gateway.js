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
var VehicleGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const users_decorator_1 = require("../user/users.decorator");
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("./vehicle.service");
const schedule_1 = require("@nestjs/schedule");
let VehicleGateway = VehicleGateway_1 = class VehicleGateway {
    constructor() {
        this.logger = new cwlogger_service_1.CWLogger(VehicleGateway_1.name);
    }
    async subscribeVehicleLocationEvent(client, user, type) {
        var _a;
        this.join(client, type);
        this.logger.log(`username ${(_a = user === null || user === void 0 ? void 0 : user.phoneNumber) !== null && _a !== void 0 ? _a : user === null || user === void 0 ? void 0 : user.email} join vehicle:location ${type}`);
    }
    async subscribeVehicleRouteRadius(client, data) {
        this.join(client, data.roomNo);
        try {
            const _scheduler = this.schedulerRegistry.doesExists('interval', client.id);
            if (_scheduler) {
                this.schedulerRegistry.deleteInterval(client.id);
            }
        }
        catch (error) {
            this.logger.error(error);
        }
        const dataVehicles = async () => {
            const vehicles = await this.vehicleService.getVehicleRouteRadius(data.objectId, parseFloat(data.lats), parseFloat(data.lons), data.minRadius, data.maxRadius);
            this.emit('vehicle:route', data.roomNo, vehicles);
        };
        dataVehicles();
        if (typeof data.intervalTime === 'number') {
            const interval = setInterval(dataVehicles, data.intervalTime);
            this.schedulerRegistry.addInterval(client.id, interval);
        }
    }
    async subscribeVehicleRouteRadius2(client, routeArray, data) {
        this.join(client, data.roomNo);
        try {
            const _scheduler = this.schedulerRegistry.doesExists('interval', client.id);
            if (_scheduler) {
                this.schedulerRegistry.deleteInterval(client.id);
            }
        }
        catch (error) {
            this.logger.error(error);
        }
        const dataVehicles = async () => {
            if (!Array.isArray(data.objectIdRoute)) {
                routeArray = Array(data.objectIdRoute);
            }
            else {
                routeArray = data.objectIdRoute;
            }
            const vehicles = await this.vehicleService.getVehicleRouteStationRadius(data.objectId, parseFloat(data.lats), parseFloat(data.lons), data.minRadius, data.maxRadius, routeArray);
            console.log("vehicles", vehicles);
            const params = {
                lats: parseFloat(data.lats),
                lons: parseFloat(data.lons),
                data: vehicles,
            };
            console.log("vehicles", vehicles);
            const result = distance_station(params);
            result.map(item => {
                const speedPerHour = item.speed > 20 ? item.speed : 20;
                const distancePerHour = item.distance / 1000;
                const time = Math.floor((distancePerHour / speedPerHour) * 60);
                const route = item.routes.find(item => item);
                item.route = {
                    name: route.name,
                    objectId: route.objectId,
                    description: route.description,
                    vehicle: { travelTime: time > 0 ? time : 1 },
                };
                delete item.routes;
            });
            result.sort((a, b) => a.route.objectId == b.route.objectId && a.distance - b.distance);
            this.emit('vehicle:routetransport', data.roomNo, result);
        };
        const distance_station = (params) => {
            console.log("params", params);
            const vehicles = params.data.filter(items => {
                console.log("vehicles", vehicles);
                const stations = items.routes
                    .filter(item => item.stations.typeStation == 'Depot')
                    .map(item => {
                    const station_lat = item.stations.location.coordinates[1];
                    const station_long = item.stations.location.coordinates[0];
                    const data = {
                        lat2: items.location.coordinates[1],
                        lon2: items.location.coordinates[0],
                        lat1: station_lat,
                        lon1: station_long,
                    };
                    const distances_km = distances(data);
                    const distanceDepot = item.stations.distanceDepot;
                    item.calculateDistance = {
                        distance: distances_km,
                        station: distanceDepot,
                    };
                    return item;
                })
                    .find(item => {
                    const distances_km = item.calculateDistance.distance;
                    const distanceDepot = item.calculateDistance.station;
                    return distances_km < distanceDepot;
                });
                return stations;
            });
            return params.data.filter(item => !vehicles.some(i => i.objectId === item.objectId));
        };
        const distances = (data) => {
            const R = 6371e3;
            const φ1 = (data.lat1 * Math.PI) / 180;
            const φ2 = (data.lat2 * Math.PI) / 180;
            const Δφ = ((data.lat2 - data.lat1) * Math.PI) / 180;
            const Δλ = ((data.lon2 - data.lon1) * Math.PI) / 180;
            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;
            return d;
        };
        dataVehicles();
        if (typeof data.intervalTime === 'number') {
            const interval = setInterval(dataVehicles, data.intervalTime);
            this.schedulerRegistry.addInterval(client.id, interval);
        }
    }
    join(client, objectId) {
        client.leaveAll();
        client.join(objectId);
    }
    emit(event, roomNo, message) {
        this.logger.log(`emit socket event ${event}`);
        this.server.to(roomNo).emit(event, message);
    }
    afterInit() {
        this.logger.log(`Bus Gateway Sockets Initialized ...`);
    }
    handleConnection(client) {
        this.logger.log(`Client Connected. ${client.id}`);
    }
    handleDisconnect(client) {
        try {
            if (this.schedulerRegistry.doesExists('interval', client.id)) {
                this.logger.log(`Client Disconnected. ${client.id}`);
                this.schedulerRegistry.deleteInterval(client.id);
            }
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], VehicleGateway.prototype, "server", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", vehicle_service_1.VehicleService)
], VehicleGateway.prototype, "vehicleService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", schedule_1.SchedulerRegistry)
], VehicleGateway.prototype, "schedulerRegistry", void 0);
__decorate([
    websockets_1.SubscribeMessage('vehicle:location'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, users_decorator_1.User()),
    __param(2, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], VehicleGateway.prototype, "subscribeVehicleLocationEvent", null);
__decorate([
    websockets_1.SubscribeMessage('vehicle:route'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VehicleGateway.prototype, "subscribeVehicleRouteRadius", null);
__decorate([
    websockets_1.SubscribeMessage('vehicle:routetransport'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(2, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], VehicleGateway.prototype, "subscribeVehicleRouteRadius2", null);
VehicleGateway = VehicleGateway_1 = __decorate([
    websockets_1.WebSocketGateway({ path: '/ws/vehicle' })
], VehicleGateway);
exports.VehicleGateway = VehicleGateway;
//# sourceMappingURL=vehicle.gateway.js.map