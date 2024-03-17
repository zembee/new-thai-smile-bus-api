import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CWLogger } from '../logger/cwlogger.service'
import {
  Route,
  RouteDocument,
} from './route.schema'
import StationResponseDto from '../station/document/station-response.dto'
import RouteResponseDto from './document/route-response.dto'
import RouteStationResponseDto from './document/route-station-response.dto'
import RouteSwitchResponseDto from './document/route-switch-response.dto'

@Injectable()
export class RouteService {
  @InjectModel(Route.name) private readonly routeService: Model<RouteDocument>
  private readonly logger: CWLogger = new CWLogger(RouteService.name)

  getModel(): Model<RouteDocument> {
    return this.routeService;
  }

  async pagination(
    query?: Record<string, any>,
    select?: Record<string, number>,
    pagination?: {
      page: number,
      perPage: number
    },
    sort?: Record<string, number>,
  ): Promise<StationResponseDto[]> {
    const {
      page = 1,
      perPage = 20,
    } = pagination
    return this
      .routeService
      .find(query)
      .select(select || {})
      .skip((page - 1) * (+perPage))
      .limit(+perPage)
      .sort(sort || { name: -1 })
      .lean()
  }

  async findByObjectId(
    objectId: string,
  ): Promise<RouteResponseDto> {
    return this
      .routeService
      .findOne({ objectId,status : 'active' })
      .lean()
  }
 

  async findStaion(objectId: string): Promise<RouteStationResponseDto[]> {
    const routes = await this.routeService.aggregate([
      {
        $unwind: '$stations',
      },
      {
        $match: {
          'stations.objectId': { $eq: objectId },
          'status':'active'
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
    ])

    return routes
  }

  async findinObjectId(origin: string,destination:string): Promise<RouteStationResponseDto[]> {
    const routes = await this.routeService.aggregate([
      {
        $match: {
          'stations.objectId': { $in: [origin,destination]  },
          'status':'active'
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          objectId:1,
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
            index:'$stations.index',
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
    ])

    return routes

  }

  //20230410
  async findRouteStaion(objectId: string): Promise<RouteStationResponseDto[]> {
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
            road:'$stationss.road',
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
    ])

    return routes
  }

  //20230419
  async findRouteStaionSwitch(stations: string,routes:string[]): Promise<RouteSwitchResponseDto[]> {
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
            road:'$stationss.road',
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
    ])

    return route
  }

}
