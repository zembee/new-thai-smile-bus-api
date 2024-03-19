import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt'
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject() private readonly usersService: UserService

  constructor(
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('authentication.secret'),
    })
  }

  async validate(jwtPayload, done) {
    const { iat, exp, id } = jwtPayload
    const timeDiff = exp - iat
    if (timeDiff <= 0) {
      throw new UnauthorizedException()
    }
    const user = await this.usersService.getByObjectId(id)
    if (user.status !== 'active') {
      throw new ForbiddenException()
    }
    done(null, user)
  }
}
