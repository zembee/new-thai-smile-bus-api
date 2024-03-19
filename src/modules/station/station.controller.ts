import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
} from '@nestjs/common'
import {
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'
import { CommonResponse } from '../../decorators/common-response.decorator'
import { StationService } from './station.service'
import StationListResponseDto from './document/station-list-response.dto'
import StationLinearResponseDto from './document/station-linear-response.dto'
import StationListDto from './dto/station-list.dto'
import StationLinearDto from './dto/linear-station.dto'
import { FilterQuery } from 'mongoose'
import {
  Station,
  StationDocument,
} from './station.schema'
import StationResponseDto from './document/station-response.dto'
import { StationTransformPipe } from './pipe/station-transform.pipe'


const Module = 'Station'

@Controller('station')
export class StationController {
  @Inject() private readonly stationService: StationService
  
  @Get('')
  @ApiOperation({ 'summary': 'รายการป้าย' })
  @CommonResponse(Module, { successType: StationListResponseDto })
  async stationList(
    @Query() queries: StationListDto,
  ): Promise<StationListResponseDto> {
    const {
      search = '',
      lat = null,
      long = null,
      minRadius = null,
      maxRadius = null,
      quantity = null,
    } = queries
    
    const query: FilterQuery<StationDocument> = { status:  'active'}
    
    if (search !== '') {
      query.$or = [
        { name: new RegExp(`.*${search}.*`, 'gi') },
        { description: new RegExp(`.*${search}.*`, 'gi') },
      ]
    }

    if (lat || long || minRadius || maxRadius || quantity) {
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [long, lat] },
          $minDistance: minRadius,
          $maxDistance: maxRadius,
        },
      }
    }

    return this.stationService.getModel().find(query).limit(quantity ?? 0).lean()
  }

  /////20230420
  @Get('stationlinear')
  @ApiOperation({ 'summary':'station linear' })
  @CommonResponse(Module, { successType: [StationLinearResponseDto] })
  async StationLinearList(
    @Query() query: StationLinearDto,
  ): Promise<any> {
    const {
      station,
      route,
    } = query

      const routes = await this.stationService.getStationLinear(station,route)
      return routes
  }

  @Get(':objectId')
  @ApiOperation({ 'summary': 'ข้อมูลป้าย' })
  @CommonResponse(Module, { successType: StationResponseDto })
  @ApiParam({ type: String, name: 'objectId' })
  async getStation(
    @Param(StationTransformPipe) station: any,
  ): Promise<StationResponseDto> {
    return station
  }
}
