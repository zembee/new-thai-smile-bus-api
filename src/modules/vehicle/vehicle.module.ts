import { Module } from '@nestjs/common'
import { VehicleController } from './vehicle.controller'
import { VehicleService } from './vehicle.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { VehicleGateway } from './vehicle.gateway'
import { RouteModule } from '../route/route.module'
import { RouteService } from '../route/route.service'
import { StationService } from '../station/station.service'
import { StationModule } from '../station/station.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    RouteModule,
    StationModule,
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
    ScheduleModule.forRoot()],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    VehicleGateway,
    RouteService,
    StationService
  ],
  exports: [
    VehicleService,
    VehicleGateway,
  ],
})
export class VehicleModule {
}
