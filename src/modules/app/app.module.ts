import { Module } from '@nestjs/common'
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../auth/auth.module'
import { CWLogger } from '../logger/cwlogger.service'
import { LoggerModule } from '../logger/logger.module'

import configuration from '../../config/configuration'
import { MongooseModule } from '@nestjs/mongoose'
import { DB_CONNECTION_NAME } from '../../constants'
import { UserModule } from '../user/user.module'
import { RouteModule } from '../route/route.module'
import { AnnouncementModule } from '../announcement/announcement.module'
import { VehicleModule } from '../vehicle/vehicle.module'
import { StationModule } from '../station/station.module'
import { OtpModule } from '../otp/otp.module'
import { FeedbackModule } from '../feedback/feedback.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: DB_CONNECTION_NAME,
      useFactory: async(configService: ConfigService) => {
        let mongoUri
        if (['testing', 'test'].includes(process.env.NODE_ENV)) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { MongoMemoryServer } = require('mongodb-memory-server')
          const mongodb = new MongoMemoryServer()
          mongoUri = await mongodb.getUri()
        } else {
          mongoUri = configService.get<string>('database.host')
        }
        return {
          uri: mongoUri,
          ...configService.get<any>('database.options'),
        }
      },
    }),
    AuthModule,
    AnnouncementModule,
    LoggerModule,
    RouteModule,
    VehicleModule,
    StationModule,
    UserModule,
    OtpModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [
    CWLogger,
    AppService,
  ],
})
export class AppModule {
}
