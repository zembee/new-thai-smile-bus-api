import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Query,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger'
import { CommonResponse } from '../../decorators/common-response.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RouteService } from './route.service'
import RouteListResponseDto from './document/route-list-response.dto'
import { RouteTransformPipe } from './pipe/route-transform.pipe'
import RouteResponseDto from './document/route-response.dto'
import { RouteAbsoluteTransformPipe } from './pipe/route-absolute-transform.pipe'
import UpdateRouteDto from './dto/update-route.dto'
import { User } from '../user/users.decorator'
import UserResponseDto from '../user/dto/user-response.dto'
import { StationService } from '../station/station.service'
import { Route } from './route.schema'
import CreateRouteDto from './dto/create-route.dto'
import sortBy from 'lodash/sortBy'
import RouteDestinationDto from './dto/route-destination.dto'
import RouteStationResponseDto from './document/route-station-response.dto'
import RouteSwitchDto from './dto/route-switch.dto'
import RouteSwitchResponseDto from './document/route-switch-response.dto'
import { FilterQuery } from 'mongoose'

const Module = 'Route'

@Controller('route')
export class RouteController {
  @Inject() private readonly routeService: RouteService
  @Inject() stationService: StationService

  // @Post('')
  // @ApiOperation({ 'summary': 'รายการเส้นทาง' })
  // @CommonResponse(Module, { successType: [RouteListResponseDto] })
  // async routeList(
  //   @Body() body: { objectId: string },
  // ): Promise<RouteListResponseDto[]> {
  //   const { objectId = null } = body
  //   const query: any = {}
  //   if (objectId) {
  //     query['stations.objectId'] = objectId,
  //     query['stations.status'] = 'active'
  //   }
  //   return this.routeService
  //     .getModel()
  //     .find(query)
  //     .select({ _id: 0, objectId: 1, name: 1, description: 1, stations: 1 })
  //     .sort({ name: 1 })
  //     .lean()
  // }
  //new 20221101
  @Post('')
  @ApiOperation({ 'summary': 'รายการเส้นทาง' })
  @CommonResponse(Module, { successType: [RouteListResponseDto] })
  async routeList(
    @Body() body: { objectId: string },
  ): Promise<RouteListResponseDto[]> {
    const { objectId = null } = body
    //const query: any = {}
    const query: FilterQuery<Route> = { status:  'active'  }

    //20230410
    //if (objectId) {
      //query['stations.objectId'] = objectId
      //query['stations.status'] = 'active'
    //}
    
    // return this.routeService
    //   .getModel()
    //   .find(query)
    //   .select({ _id: 0, objectId: 1, status:1,name: 1, description: 1, stations: 1 })
    //   .sort({ name: 1 })
    //   .lean()
    const route = await this.routeService.findRouteStaion(objectId)
    return route
  }

  @HttpCode(200)
  @Post('search')
  @ApiOperation({ 'summary': 'รายการเส้นทาง (จาก สถานีต้นทาง - ปลายทาง)' })
  @CommonResponse(Module, { successType: [RouteListResponseDto] })
  async routeListFromDestination(
    @Body() body: RouteDestinationDto,
  ): Promise<any> {
    const { origin, destination } = body
    const query: FilterQuery<Route> = { status:  'active'  }
    query['stations.objectId'] = origin,
    query['stations.objectId'] = destination
    // const query: any = {
    //   $and: [
    //     { 'stations.objectId': origin },
    //     { 'stations.objectId': destination },
    //   ],
    // }
    let routes = await this.routeService
      .getModel()
      .find(query)
      .select({ _id: 0, objectId: 1, name: 1, description: 1, stations: 1 })
      .sort({ name: 1 })
      .lean()
    if (routes.length) {
      routes = await Promise.all(routes.map(async(route) => {
        let { stations } = route
        stations = sortBy(stations, ['type', 'index'])
        stations = stations.splice(
          stations.findIndex((s) => s.objectId === origin),
          stations.findIndex((s) => s.objectId === destination) + 1)
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
        return { ...route, stations }
      }))
    }
    return routes
  }

  /////20230324
  @HttpCode(200)
  @Get('search')
  @ApiOperation({ 'summary':'รายการเส้นทาง (จาก สถานีต้นทาง - ปลายทาง)' })
  @CommonResponse(Module, { successType: [RouteDestinationDto] })
  async routeOriginDestinationList(
    @Query() query: RouteDestinationDto,
  ): Promise<any> {
    const {
      origin,
      destination,
    } = query

      const route = await this.routeService.findinObjectId(origin,destination)
      return route
  }

  /////20230419
  @HttpCode(200)
  @Get('routeswitch')
  @ApiOperation({ 'summary':'switch สายรถ' })
  @CommonResponse(Module, { successType: [RouteSwitchResponseDto] })
  async routeSwitchList(
    @Query() query: RouteSwitchDto,
    routeArray : string[],
  ): Promise<any> {
    
    const {
      stations,
      routes ,
    } = query

    if(!Array.isArray(routes)){
      routeArray = Array(routes);
    }else{
      routeArray =routes;
    }
        
    const route = await this.routeService.findRouteStaionSwitch(stations,routeArray)
    return route
  }

  @Get(':objectId')
  @ApiOperation({ 'summary': 'ข้อมูลเส้นทาง' })
  @CommonResponse(Module, { successType: RouteResponseDto })
  @ApiParam({ type: String, name: 'objectId' })
  async getRoute(
    @Param(RouteTransformPipe) route: any,
  ): Promise<RouteResponseDto> {
    return route
  }

  @Get('station/:objectId')
  @ApiOperation({ summary: 'ค้นหาข้อมูลเส้นทางโดยสถานี' })
  @CommonResponse(Module, { successType: [RouteStationResponseDto] })
  @ApiParam({ type: String, name: 'objectId' })
  async getRouteStation(
    @Param() params: any,
  ): Promise<Array<RouteStationResponseDto>> {
    const { objectId = '' } = params

    if (objectId === '') {
      throw new BadRequestException({
        message: 'not found route.',
      })
    } else {
      const route = await this.routeService.findStaion(objectId)
      return route
    }
  }



}


