import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private readonly configService: ConfigService) {
    super(
      { header: 'X-Api-Key', 'prefix': '' },
      true,
      async(payload: string, done: any) => {
        try {
          const apiKey = this.configService.get('authentication.apiKey')
          if (payload !== apiKey) {
            return done(null)
          }
          return done(null, payload)
        } catch (e) {
          return done(null)
        }
      },
    )
  }
}
