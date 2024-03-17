import { Module } from '@nestjs/common'
import { RouteService } from './route.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { RouteController } from './route.controller'
import { StationModule } from '../station/station.module'
import { StationService } from '../station/station.service'

@Module({
  imports: [
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
    StationModule,
  ],
  providers: [
    RouteService,
    StationService,
  ],
  controllers: [RouteController],
})
export class RouteModule {
}
