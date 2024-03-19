import { Module } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { PassportModule } from '@nestjs/passport'
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { UserService } from '../user/user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { ApiKeyStrategy } from './api-key.strategy'

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('authentication.secret'),
          signOptions: configService.get<jwt.SignOptions>('authentication.jwtOptions'),
        }
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
  ],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ApiKeyStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
