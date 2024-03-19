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
var VehicleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const vehicle_schema_1 = require("./vehicle.schema");
const mongoose_1 = require("mongoose");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const mongoose_2 = require("@nestjs/mongoose");
let VehicleService = VehicleService_1 = class VehicleService {
    constructor() {
        this.logger = new cwlogger_service_1.CWLogger(VehicleService_1.name);
    }
    getModel() {
        return this.vehicleModel;
    }
    async pagination(query, select, pagination, sort) {
        const { page = 1, perPage = 20 } = pagination;
        return this.vehicleModel
            .find(query)
            .select(select || {})
            .skip((page - 1) * +perPage)
            .limit(+perPage)
            .sort(sort || { name: -1 })
            .lean();
    }
    async updateVehicleLocation(locations) {
        const busImei = [];
        const updateBulkWriteLocation = locations.map(location => {
            busImei.push(location.imei);
            return {
                updateOne: {
                    filter: {
                        gpsUnitId: location.imei,
                    },
                    update: {
                        speed: location.speed,
                        latestActive: new Date(location.recv_utc_ts),
                        engineStatus: location.engine_status,
                        location: {
                            type: 'Point',
                            coordinates: [location.lon, location.lat],
                        },
                    },
                },
            };
        });
        await this.vehicleModel.bulkWrite(updateBulkWriteLocation);
        return this.vehicleModel
            .find({
            gpsUnitId: { $in: busImei },
        }, {
            objectId: 1,
            route: 1,
        })
            .lean();
    }
    async getVehicleRouteRadius(objectId, lat, long, minRadius, maxRadius) {
        const vehicles = await this.vehicleModel.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [long, lat] },
                    minDistance: minRadius,
                    maxDistance: maxRadius,
                    spherical: true,
                    distanceField: 'distance',
                },
            },
            {
                $lookup: {
                    from: 'route',
                    localField: 'route',
                    foreignField: 'objectId',
                    as: 'route',
                },
            },
            {
                $unwind: '$route',
            },
            {
                $match: {
                    'route.stations': {
                        $elemMatch: { objectId },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    routeStatus: 1,
                    engineStatus: 1,
                    speed: 1,
                    latestActive: 1,
                    objectId: 1,
                    location: 1,
                    'route.objectId': 1,
                    distance: 1,
                    number: 1,
                    name: 1,
                    registerNumber: 1,
                    'gpsDataReference.course': 1,
                    'route.name': 1,
                },
            },
            {
                $sort: { 'route.objectId': 1, distance: 1 },
            },
        ]);
        console.log("vehicles", vehicles);
        return vehicles;
    }
    async getVehicleRouteRadius2(objectId, lat, long, minRadius, maxRadius) {
        const vehicles = await this.vehicleModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [long, lat],
                    },
                    distanceField: 'distance',
                    maxDistance: maxRadius,
                    minDistance: minRadius,
                    spherical: true,
                },
            },
            {
                $lookup: {
                    from: 'route',
                    localField: 'route',
                    foreignField: 'objectId',
                    as: 'routes',
                },
            },
            {
                $unwind: '$routes',
            },
            {
                $lookup: {
                    from: 'station',
                    localField: 'routes.stations.objectId',
                    foreignField: 'objectId',
                    as: 'routes.stationss',
                },
            },
            {
                $unwind: {
                    path: '$routes.stations',
                },
            },
            {
                $unwind: {
                    path: '$routes.stationss',
                },
            },
            {
                $redact: {
                    $cond: [
                        {
                            $eq: ['$routes.stations.objectId', '$routes.stationss.objectId'],
                        },
                        '$$KEEP',
                        '$$PRUNE',
                    ],
                },
            },
            {
                $project: {
                    _id: 0,
                    routeStatus: 1,
                    engineStatus: 1,
                    speed: 1,
                    latestActive: 1,
                    objectId: 1,
                    location: 1,
                    distance: 1,
                    number: 1,
                    name: 1,
                    registerNumber: 1,
                    'gpsDataReference.course': 1,
                    routes: {
                        objectId: '$routes.objectId',
                        name: '$routes.name',
                        status: '$routes.status',
                        description: '$routes.description',
                        stations: {
                            objectId: '$routes.stations.objectId',
                            type: '$routes.stations.type',
                            distanceDepot: '$routes.stations.distanceDepot',
                            typeStation: '$routes.stations.typeStation',
                            objectIds: '$routes.stationss.objectId',
                            location: '$routes.stationss.location',
                            name: '$routes.stationss.name',
                            status: '$routes.stationss.status',
                        },
                    },
                },
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        routeStatus: '$routeStatus',
                        engineStatus: '$engineStatus',
                        speed: '$speed',
                        latestActive: '$latestActive',
                        objectId: '$objectId',
                        location: '$location',
                        distance: '$distance',
                        number: '$number',
                        name: '$name',
                        registerNumber: '$registerNumber',
                        gpsDataReference: {
                            course: '$gpsDataReference.course',
                        },
                    },
                    routes: {
                        $push: '$routes',
                    },
                },
            },
            {
                $project: {
                    _id: '$_id._id',
                    routeStatus: '$_id.routeStatus',
                    engineStatus: '$_id.engineStatus',
                    speed: '$_id.speed',
                    latestActive: '$_id.latestActive',
                    objectId: '$_id.objectId',
                    location: '$_id.location',
                    distance: '$_id.distance',
                    number: '$_id.number',
                    name: '$_id.name',
                    registerNumber: '$_id.registerNumber',
                    gpsDataReference: '$_id.gpsDataReference',
                    routes: '$routes',
                },
            },
            {
                $match: {
                    'routes.stations.status': 'active',
                    'routes.stations.objectId': objectId,
                },
            },
            {
                $sort: {
                    'routes.objectId': 1,
                    distance: 1,
                },
            },
        ]);
        return vehicles;
    }
    async getVehicleRouteStationRadius(objectId, lat, long, minRadius, maxRadius, objectIdRoute) {
        const vehicles = await this.vehicleModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [long, lat],
                    },
                    distanceField: 'distance',
                    maxDistance: maxRadius,
                    minDistance: minRadius,
                    spherical: true,
                },
            },
            {
                $lookup: {
                    from: 'route',
                    localField: 'route',
                    foreignField: 'objectId',
                    as: 'routes',
                },
            },
            {
                $unwind: '$routes',
            },
            {
                $lookup: {
                    from: 'station',
                    localField: 'routes.stations.objectId',
                    foreignField: 'objectId',
                    as: 'routes.stationss',
                },
            },
            {
                $unwind: {
                    path: '$routes.stations',
                },
            },
            {
                $unwind: {
                    path: '$routes.stationss',
                },
            },
            {
                $redact: {
                    $cond: [
                        {
                            $eq: ['$routes.stations.objectId', '$routes.stationss.objectId'],
                        },
                        '$$KEEP',
                        '$$PRUNE',
                    ],
                },
            },
            {
                $project: {
                    _id: 0,
                    routeStatus: 1,
                    engineStatus: 1,
                    speed: 1,
                    latestActive: 1,
                    objectId: 1,
                    location: 1,
                    distance: 1,
                    number: 1,
                    name: 1,
                    registerNumber: 1,
                    'gpsDataReference.course': 1,
                    routes: {
                        objectId: '$routes.objectId',
                        name: '$routes.name',
                        status: '$routes.status',
                        description: '$routes.description',
                        stations: {
                            objectId: '$routes.stations.objectId',
                            type: '$routes.stations.type',
                            distanceDepot: '$routes.stations.distanceDepot',
                            typeStation: '$routes.stations.typeStation',
                            objectIds: '$routes.stationss.objectId',
                            location: '$routes.stationss.location',
                            name: '$routes.stationss.name',
                            status: '$routes.stationss.status',
                        },
                    },
                },
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        routeStatus: '$routeStatus',
                        engineStatus: '$engineStatus',
                        speed: '$speed',
                        latestActive: '$latestActive',
                        objectId: '$objectId',
                        location: '$location',
                        distance: '$distance',
                        number: '$number',
                        name: '$name',
                        registerNumber: '$registerNumber',
                        gpsDataReference: {
                            course: '$gpsDataReference.course',
                        },
                    },
                    routes: {
                        $push: '$routes',
                    },
                },
            },
            {
                $project: {
                    _id: '$_id._id',
                    routeStatus: '$_id.routeStatus',
                    engineStatus: '$_id.engineStatus',
                    speed: '$_id.speed',
                    latestActive: '$_id.latestActive',
                    objectId: '$_id.objectId',
                    location: '$_id.location',
                    distance: '$_id.distance',
                    number: '$_id.number',
                    name: '$_id.name',
                    registerNumber: '$_id.registerNumber',
                    gpsDataReference: '$_id.gpsDataReference',
                    routes: '$routes',
                },
            },
            {
                $match: {
                    'routes.stations.status': 'active',
                    'routes.stations.objectId': objectId,
                    '$and': [
                        {
                            'routes.objectId': {
                                '$exists': true,
                                '$in': objectIdRoute
                            }
                        }
                    ]
                },
            },
            {
                $sort: {
                    'routes.objectId': 1,
                    distance: 1,
                },
            },
        ]);
        console.log("vehicles cc", vehicles);
        return vehicles;
    }
};
__decorate([
    mongoose_2.InjectModel(vehicle_schema_1.Vehicle.name),
    __metadata("design:type", mongoose_1.Model)
], VehicleService.prototype, "vehicleModel", void 0);
VehicleService = VehicleService_1 = __decorate([
    common_1.Injectable()
], VehicleService);
exports.VehicleService = VehicleService;
//# sourceMappingURL=vehicle.service.js.map