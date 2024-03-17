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
}
