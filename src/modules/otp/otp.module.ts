import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { OtpService } from './otp.service'
import { OtpController } from './otp.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
  ],
  providers: [
    OtpService,
  ],
  controllers: [
    OtpController,
  ],
})
export class OtpModule {
}
