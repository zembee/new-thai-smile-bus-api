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
var StationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const station_schema_1 = require("./station.schema");
const route_schema_1 = require("../route/route.schema");
const sortBy_1 = __importDefault(require("lodash/sortBy"));
let StationService = StationService_1 = class StationService {
    constructor() {
        this.logger = new cwlogger_service_1.CWLogger(StationService_1.name);
    }
    getModel() {
        return this.stationService;
    }
    async pagination(query, select, pagination, sort) {
        const { page = 1, perPage = 20, } = pagination;
        return this
            .stationService
            .find(query)
            .select(select || {})
            .skip((page - 1) * (+perPage))
            .limit(+perPage)
            .sort(sort || { name: -1 })
            .lean();
    }
    async findByObjectId(objectId) {
        return this
            .stationService
            .findOne({ objectId })
            .lean();
    }
    async findByObjectIdStatus(objectId) {
        return this
            .stationService
            .findOne({ objectId, status: 'active' })
            .lean();
    }
    async findByName(name) {
        return this
            .stationService
            .findOne({ name })
            .lean();
    }
    async create(station) {
        return this
            .stationService
            .create(station);
    }
    async getStations(route) {
        let { stations } = route;
        stations = await Promise.all(stations.map(async (station) => {
            const { index, type, objectId } = station;
            const st = await this.findByObjectId(objectId);
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
        return sortBy_1.default(stations, ['type', 'index']);
    }
    async getStationRouteRadius(search, lat, long, minRadius, maxRadius, quantity) {
        const stations = await this.stationService.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [
                            lat, long
                        ]
                    },
                    distanceField: 'distance',
                    maxDistance: maxRadius,
                    minDistance: minRadius,
                    spherical: true
                }
            }, {
                $limit: {
                    quantity
                }
            }, {
                $project: {
                    _id: 1,
                    updatedBy: 1,
                    createdBy: 1,
                    status: 1,
                    name: 1,
                    description: 1,
                    location: 1,
                    objectId: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }, {
                $match: {
                    status: 'active',
                    $or: [
                        {
                            name: { '$regex': new RegExp(`.*${search}.*`, 'gi') },
                        },
                        {
                            description: { '$regex': new RegExp(`.*${search}.*`, 'gi') },
                        },
                    ],
                }
            }
        ]);
        return stations;
    }
    async getStationLinear(station, route) {
        const stations = await this.routeService.aggregate([
            {
                $lookup: {
                    from: "station",
                    localField: "stations.objectId",
                    foreignField: "objectId",
                    as: "stationss",
                },
            },
            {
                $unwind: {
                    path: "$stations",
                },
            },
            {
                $unwind: {
                    path: "$stationss",
                },
            },
            {
                $redact: {
                    $cond: [
                        {
                            $eq: [
                                "$stations.objectId",
                                "$stationss.objectId",
                            ],
                        },
                        "$$KEEP",
                        "$$PRUNE",
                    ],
                },
            },
            {
                $project: {
                    _id: 0,
                    objectId: 1,
                    status: 1,
                    name: 1,
                    description: 1,
                    stations: {
                        index: "$stations.index",
                        objectId: "$stations.objectId",
                        type: "$stations.type",
                        distanceDepot: "$stations.distanceDepot",
                        typeStation: "$stations.typeStation",
                        name: "$stationss.name",
                        description: "$stationss.description",
                        location: "$stationss.location",
                    },
                },
            },
            {
                $match: {
                    "stations.objectId": station,
                    "stations.typeStation": "Station",
                    "objectId": route,
                },
            },
            {
                $group: {
                    _id: {
                        _id: "$_id",
                        objectId: "$objectId",
                        status: "$status",
                        name: "$name",
                        description: "$description",
                    },
                    stations: {
                        $push: "$stations",
                    },
                },
            },
            {
                $project: {
                    _id: "$_id._id",
                    objectId: "$_id.objectId",
                    status: "$_id.status",
                    name: "$_id.name",
                    description: "$_id.description",
                    stations: "$stations",
                },
            },
            {
                $unwind: "$stations",
            },
            {
                $group: {
                    _id: {
                        _id: "$_id",
                        location: "$stations.location",
                        index: "$stations.index",
                        name: "$stations.name",
                        type: "$stations.type",
                        objectId: "$stations.objectId",
                    },
                },
            },
            {
                $project: {
                    _id: "$_id._id",
                    objectId: "$_id.objectId",
                    index: "$_id.index",
                    name: "$_id.name",
                    type: "$_id.type",
                    location: "$_id.location",
                },
            },
            {
                $sort: {
                    name: 1,
                },
            },
        ]);
        return stations;
    }
};
__decorate([
    mongoose_1.InjectModel(station_schema_1.Station.name),
    __metadata("design:type", mongoose_2.Model)
], StationService.prototype, "stationService", void 0);
__decorate([
    mongoose_1.InjectModel(route_schema_1.Route.name),
    __metadata("design:type", mongoose_2.Model)
], StationService.prototype, "routeService", void 0);
StationService = StationService_1 = __decorate([
    common_1.Injectable()
], StationService);
exports.StationService = StationService;
//# sourceMappingURL=station.service.js.map