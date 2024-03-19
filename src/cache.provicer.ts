import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { CacheModuleAsyncOptions } from '@nestjs/common/cache/interfaces/cache-module.interface'

export const RegisterCacheOptions: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async(configService: ConfigService) => {
    return {
      store: redisStore,
      host: configService.get<string>('redis.host'),
      port: configService.get<number>('redis.port'),
      ttl: configService.get('cache_ttl') || 5,
    }
  },
  inject: [ConfigService],
}
