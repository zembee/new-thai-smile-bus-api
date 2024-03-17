import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CWLogger } from '../logger/cwlogger.service'
import { Station, StationDocument } from './station.schema'
import StationResponseDto from './document/station-response.dto'
import { Route,RouteDocument } from '../route/route.schema'
import sortBy from 'lodash/sortBy'
import RouteResponseDto from '../route/document/route-response.dto'


@Injectable()
export class StationService {
  @InjectModel(Station.name) private readonly stationService: Model<StationDocument>
  @InjectModel(Route.name) private readonly routeService: Model<RouteDocument>

  private readonly logger: CWLogger = new CWLogger(StationService.name)

  getModel(): Model<StationDocument> {
    return this.stationService
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
      .stationService
      .find(query)
      .select(select || {})
      .skip((page - 1) * (+perPage))
      .limit(+perPage)
      .sort(sort || { name: -1 })
      .lean()
  }

  async findByObjectId(
    objectId: string,
  ): Promise<StationResponseDto> {
    return this
      .stationService
      .findOne({ objectId })
      .lean()
  }
  async findByObjectIdStatus(
    objectId: string,
  ): Promise<StationResponseDto> {
    return this
      .stationService
      .findOne({ objectId ,status:'active'})
      .lean()
  }
  async findByName(
    name: string,
  ): Promise<StationResponseDto> {
    return this
      .stationService
      .findOne({ name })
      .lean()
  }

  async create(
    station: Station,
  ): Promise<StationDocument> {
    return this
      .stationService
      .create(station)
  }


  async getStations(
    route: RouteResponseDto,
  ): Promise<Record<string, any>> {
    let { stations } = route
    stations = await Promise.all(stations.map(async(station) => {
      const { index, type, objectId } = station
      const st = await this.findByObjectId(objectId)
      if (st) {
        const { name, description, location } = st
        return {
          name,
          description,
          location,
          index,
          type,
          objectId,
        }
      }
    }))

    return sortBy(stations, ['type', 'index'])
  }

  async getStationRouteRadius(
    search: string,
    lat: number,
    long: number,
    minRadius: number,
    maxRadius: number,
    quantity:number
  ): Promise<any[]> {
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
      },  {
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
      },{
        $match: {
          status: 'active',
          $or: [
            {
              name:{ '$regex': new RegExp(`.*${search}.*`, 'gi')  },
            },
            {
              description: { '$regex': new RegExp(`.*${search}.*`, 'gi')  },
            },
          ],
        }
      }
    ])
   
    return stations
  }

  // 20230420
  async getStationLinear(
    station: string,
    route: string,
  ): Promise<any[]> {
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
          "stations.objectId":station,
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
    ])
   
    return stations
  }
}
