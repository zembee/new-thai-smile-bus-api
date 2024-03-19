import { BadRequestException, Inject, Injectable, PipeTransform } from '@nestjs/common'
import { VehicleService } from '../vehicle.service'
import VehicleResponseDto from '../document/vehicle-response.dto'
import { StationService } from '../../station/station.service'
import { RouteService } from '../../route/route.service'
import sortBy from 'lodash/sortBy'

@Injectable()
export class VehicleTransformPipe implements PipeTransform {
  @Inject() busService: VehicleService
  @Inject() stationService: StationService
  @Inject() routeService: RouteService

  async transform(body: { objectId }): Promise<Partial<VehicleResponseDto>> {
    const { objectId } = body
    const vehicle = await this.busService.getModel().findOne({ objectId,status:'active' }).select({ _id: 0 }).lean()
    if (!vehicle) {
      throw new BadRequestException({
        message: 'not found vehicle.',
      })
    }
    let route = await this.routeService.findByObjectId(vehicle.route) ?? null
    if (route) {
      const stations = await this.stationService.getStations(route)
      route = {
        ...route,
        stations: sortBy(stations, ['type', 'index']),
      }
    }
    // TODO get employee
    return {
      ...vehicle,
      passengerCount: 10,
      wifiConnectCount: 5,
      route,
      employee: null,
    }
  }
}
