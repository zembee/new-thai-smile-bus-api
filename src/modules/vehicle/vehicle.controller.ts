import {
  Body,
  Controller,
  Get, HttpCode,
  Inject,
  Param, Post,
} from '@nestjs/common'
import { ApiOperation, ApiParam } from '@nestjs/swagger'
import { VehicleService } from './vehicle.service'
import { CommonResponse } from '../../decorators/common-response.decorator'
import { Vehicle } from './vehicle.schema'
import RouteResponseDto from '../route/document/route-response.dto'
import VehicleListResponseDto from './document/vehicle-list-response.dto'
import { RouteService } from '../route/route.service'
import { VehicleTransformPipe } from './pipe/vehicle-transform.pipe'
import { CWLogger } from '../logger/cwlogger.service'
import { VehicleGateway } from './vehicle.gateway'
import { FilterQuery } from 'mongoose'
import dayjs, { Dayjs } from 'dayjs'

const Module = 'Vehicle'

@Controller('vehicle')
export class VehicleController {
  @Inject() vehicleService: VehicleService
  @Inject() routeService: RouteService
  @Inject() vehicleGatewayService: VehicleGateway
  private readonly logger: CWLogger = new CWLogger(VehicleController.name)

  @HttpCode(200)
  @Post('')
  @ApiOperation({ 'summary': 'รายการพาหนะทั้งหมด' })
  @CommonResponse(Module, { successType: VehicleListResponseDto })
  async vehicleList(
    @Body() body: {
      route: string,
      lat: number,
      long: number,
      minRadius: number,
      maxRadius: number,
    },
  ): Promise<VehicleListResponseDto> {
    const {
      lat = null,
      long = null,
      minRadius = null,
      maxRadius = null,
    } = body
    const afkTime = dayjs().subtract(1, 'hour').toDate()
    const query: FilterQuery<Vehicle> = { status:'active',updatedAt: { $gte: afkTime } }
    if (body.route) {
      query.route = body.route
    }

    if (lat && long && minRadius && maxRadius) {
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [long, lat] },
          $minDistance: minRadius,
          $maxDistance: maxRadius,
        },
      }
    }

    return this.vehicleService.getModel().find(query).lean()
  }

  @Get(':objectId')
  @ApiOperation({ 'summary': 'ข้อมูลพาหนะ' })
  @CommonResponse(Module, { successType: [] })
  @ApiParam({ type: String, name: 'objectId' })
  async getVehicle(
    @Param(VehicleTransformPipe) vehicle: any,
  ): Promise<RouteResponseDto> {
    return vehicle
  }
}
