import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { UserController } from './user.controller'
import { UserService } from './user.service'

import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { OtpService } from '../otp/otp.service'
import { VehicleService } from '../vehicle/vehicle.service'

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
  ],
  providers: [
    UserService,
    OtpService,
    VehicleService,
  ],
  controllers: [
    UserController,
  ],
  exports: [UserService],
})
export class UserModule {
}
