import { Module } from '@nestjs/common'
import { StationService } from './station.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { StationController } from './station.controller'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [StationController],
  providers: [StationService],
  exports: [StationService],
})
export class StationModule {
}
