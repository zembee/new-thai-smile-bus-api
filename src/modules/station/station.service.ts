import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CWLogger } from '../logger/cwlogger.service'
import { Station, StationDocument } from './station.schema'
import StationResponseDto from './document/station-response.dto'
import { Route } from '../route/route.schema'
import sortBy from 'lodash/sortBy'
import RouteResponseDto from '../route/document/route-response.dto'

@Injectable()
export class StationService {
  @InjectModel(Station.name) private readonly stationService: Model<StationDocument>
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
}
