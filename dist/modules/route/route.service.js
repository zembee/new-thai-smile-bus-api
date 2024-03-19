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
var RouteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cwlogger_service_1 = require("../logger/cwlogger.service");
const route_schema_1 = require("./route.schema");
let RouteService = RouteService_1 = class RouteService {
    constructor() {
        this.logger = new cwlogger_service_1.CWLogger(RouteService_1.name);
    }
    getModel() {
        return this.routeService;
    }
    async pagination(query, select, pagination, sort) {
        const { page = 1, perPage = 20, } = pagination;
        return this
            .routeService
            .find(query)
            .select(select || {})
            .skip((page - 1) * (+perPage))
            .limit(+perPage)
            .sort(sort || { name: -1 })
            .lean();
    }
    async findByObjectId(objectId) {
        return this
            .routeService
            .findOne({ objectId, status: 'active' })
            .lean();
    }
    async findStaion(objectId) {
        const routes = await this.routeService.aggregate([
            {
                $unwind: '$stations',
            },
            {
                $match: {
                    'stations.objectId': { $eq: objectId },
                    'status': 'active'
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    description: 1,
                    stations: 1,
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$stations', '$$ROOT'],
                    },
                },
            },
            {
                $project: {
                    index: 0,
                    stations: 0,
                },
            },
        ]);
        return routes;
    }
    async findinObjectId(origin, destination) {
        const routes = await this.routeService.aggregate([
            {
                $match: {
                    'stations.objectId': { $in: [origin, destination] },
                    'status': 'active'
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    objectId: 1,
                    description: 1,
                    stations: 1,
                },
            },
            {
                $lookup: {
                    from: 'station',
                    localField: 'stations.objectId',
                    foreignField: 'objectId',
                    as: 'stationss'
                }
            },
            {
                $unwind: {
                    path: '$stations'
                }
            },
            {
                $unwind: {
                    path: '$stationss'
                }
            },
            {
                $redact: {
                    $cond: [
                        {
                            $eq: [
                                '$stations.objectId', '$stationss.objectId'
                            ]
                        }, '$$KEEP', '$$PRUNE'
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    objectId: 1,
                    description: 1,
                    stations: {
                        index: '$stations.index',
                        objectId: '$stations.objectId',
                        type: '$stations.type',
                        distanceDepot: '$stations.distanceDepot',
                        typeStation: '$stations.typeStation',
                        objectIds: '$stationss.objectId',
                        location: '$stationss.location',
                        name: '$stationss.name',
                        road: '$stationss.road',
                        status: '$stationss.status'
                    }
                }
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        objectId: '$objectId',
                        name: '$name',
                        description: '$description'
                    },
                    stations: {
                        $push: '$stations'
                    }
                }
            },
            {
                $project: {
                    _id: '$_id._id',
                    objectId: '$_id.objectId',
                    name: '$_id.name',
                    description: '$_id.description',
                    stations: '$stations'
                }
            },
            {
                $project: {
                    stations: {
                        $filter: {
                            input: '$stations',
                            as: 'stations',
                            cond: {
                                $ne: [
                                    '$$stations.typeStation', 'Depot'
                                ]
                            }
                        }
                    },
                    name: 1,
                    description: 1,
                    objectId: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    name: 1
                }
            }
        ]);
        return routes;
    }
    async findRouteStaion(objectId) {
        const routes = await this.routeService.aggregate([
            {
                $lookup: {
                    from: 'station',
                    localField: 'stations.objectId',
                    foreignField: 'objectId',
                    as: 'stationss'
                }
            },
            {
                $unwind: {
                    path: '$stations',
                },
            },
            {
                $unwind: {
                    path: '$stationss'
                }
            },
            {
                $redact: {
                    $cond: [
                        {
                            $eq: [
                                '$stations.objectId', '$stationss.objectId'
                            ]
                        }, '$$KEEP', '$$PRUNE'
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    objectId: 1,
                    status: 1,
                    name: 1,
                    description: 1,
                    stations: {
                        index: '$stations.index',
                        objectId: '$stations.objectId',
                        type: '$stations.type',
                        distanceDepot: '$stations.distanceDepot',
                        typeStation: '$stations.typeStation',
                        name: '$stationss.name',
                        road: '$stationss.road',
                        description: '$stationss.description',
                        location: '$stationss.location'
                    }
                }
            }, {
                $group: {
                    _id: {
                        _id: '$_id',
                        objectId: '$objectId',
                        status: '$status',
                        name: '$name',
                        description: '$description'
                    },
                    stations: {
                        $push: '$stations'
                    }
                }
            }, {
                $project: {
                    _id: '$_id._id',
                    objectId: '$_id.objectId',
                    status: '$_id.status',
                    name: '$_id.name',
                    description: '$_id.description',
                    stations: '$stations'
                }
            }, {
                $match: {
                    'stations.objectId': objectId
                }
            }, {
                $sort: {
                    name: 1
                }
            }
        ]);
        return routes;
    }
    async findRouteStaionSwitch(stations, routes) {
        const route = await this.routeService.aggregate([
            {
                $lookup: {
                    from: 'station',
                    localField: 'stations.objectId',
                    foreignField: 'objectId',
                    as: 'stationss'
                }
            },
            {
                $unwind: {
                    path: '$stations',
                },
            },
            {
                $unwind: {
                    path: '$stationss'
                }
            },
            {
                $redact: {
                    $cond: [
                        {
                            $eq: [
                                '$stations.objectId', '$stationss.objectId'
                            ]
                        }, '$$KEEP', '$$PRUNE'
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    objectId: 1,
                    status: 1,
                    name: 1,
                    description: 1,
                    stations: {
                        index: '$stations.index',
                        objectId: '$stations.objectId',
                        type: '$stations.type',
                        distanceDepot: '$stations.distanceDepot',
                        typeStation: '$stations.typeStation',
                        name: '$stationss.name',
                        road: '$stationss.road',
                        description: '$stationss.description',
                        location: '$stationss.location'
                    }
                }
            }, {
                $group: {
                    _id: {
                        _id: '$_id',
                        objectId: '$objectId',
                        status: '$status',
                        name: '$name',
                        description: '$description'
                    },
                    stations: {
                        $push: '$stations'
                    }
                }
            }, {
                $project: {
                    _id: '$_id._id',
                    objectId: '$_id.objectId',
                    status: '$_id.status',
                    name: '$_id.name',
                    description: '$_id.description',
                    stations: '$stations'
                }
            }, {
                $match: {
                    'stations.objectId': stations,
                    '$and': [
                        {
                            'objectId': {
                                '$exists': true,
                                '$in': routes
                            }
                        }
                    ]
                }
            }, {
                $sort: {
                    name: 1
                }
            }
        ]);
        return route;
    }
};
__decorate([
    mongoose_1.InjectModel(route_schema_1.Route.name),
    __metadata("design:type", mongoose_2.Model)
], RouteService.prototype, "routeService", void 0);
RouteService = RouteService_1 = __decorate([
    common_1.Injectable()
], RouteService);
exports.RouteService = RouteService;
//# sourceMappingURL=route.service.js.map