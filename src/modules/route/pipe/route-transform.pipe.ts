import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { RouteService } from '../route.service'
import RouteResponseDto from '../document/route-response.dto'
import { StationService } from '../../station/station.service'
import sortBy from 'lodash/sortBy'

@Injectable()
export class RouteTransformPipe implements PipeTransform {
  @Inject() routeService: RouteService
  @Inject() stationService: StationService

  async transform(body: { objectId }): Promise<RouteResponseDto> {
    const { objectId: id } = body
    const route = await this.routeService.findByObjectId(id)
    if (!route) {
      throw new BadRequestException({
        message: 'not found route.',
      })
    }
    let { stations } = route
    stations = await Promise.all(stations.map(async(station) => {
      const { index, type, objectId } = station
      const st = await this.stationService.findByObjectId(objectId)
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

    return {
      ...route,
      stations: sortBy(stations, ['type', 'index']),
      bus: {
        online: 10,
        offline: 3,
      },
      employee: {
        online: 20,
        offline: 10,
      },
    }
  }
}
