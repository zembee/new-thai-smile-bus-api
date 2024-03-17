import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {
  JwtService,
  JwtSignOptions,
} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcrypt'

import { CWLogger } from '../logger/cwlogger.service'
import { UserService } from '../user/user.service'
import { IUser } from '../user/user.schema'
import { SocialAuthDto } from './dto/social-auth.dto'
import UserResponseDto from '../user/dto/user-response.dto'

@Injectable()
export class AuthService {
  @Inject() private readonly logger: CWLogger = new CWLogger('Auth Service')
  @Inject() private readonly usersService: UserService
  @Inject() private readonly jwtService: JwtService
  @Inject() private readonly configService: ConfigService

  createToken(user: IUser): {
    refreshToken: string,
    accessToken: string,
  } & IUser {
    const jwtOptions: JwtSignOptions = {
      secret: this.configService.get('authentication.secret'),
    }
    return {
      refreshToken: null,
      accessToken: this.jwtService.sign({ id: user.objectId }, jwtOptions),
      ...user,
    }
  }

  async createSocialToken(body: SocialAuthDto): Promise<{
    refreshToken: string,
    accessToken: string,
    socialLogin: boolean
  }> {
    let email: string
    let password: string
    let appleId: string
    let googleId: string
    let facebookId: string

    const payload: any = this.jwtService.decode(body.jwt)
    const identity = payload?.firebase?.identities ?? null
    let user: UserResponseDto

    try {
      if (identity?.hasOwnProperty('google.com')) {
        email = identity?.email[0] ?? identity.email
        password = identity['google.com'][0]
        googleId = identity['google.com'][0]
        user = await this.usersService.findOne({ googleId })
      }

      if (identity?.hasOwnProperty('facebook.com')) {
        if (identity?.email?.length) {
          email = identity.email[0]
        }
        email = identity?.email[0] ?? `${identity['facebook.com'][0]}@facebook.com`
        password = identity['facebook.com'][0]
        facebookId = identity['facebook.com'][0]
        user = await this.usersService.findOne({ facebookId })
      }

      if (identity?.hasOwnProperty('apple.com')) {
        email = `${identity['apple.com'][0]}@apple.com`
        password = identity['apple.com'][0]
        appleId = identity['apple.com'][0]
        user = await this.usersService.findOne({ appleId })
      }
      if (!user) {
        user = await this.usersService.register({
          email,
          password,
          appleId,
          googleId,
          facebookId,
          firstName: '',
          lastName: '',
          phoneNumber: '',
        })
      }

      await this.usersService.getModel().updateOne({ email }, { $set: { latestLogin: new Date() } })
      const jwtOptions: JwtSignOptions = {
        secret: this.configService.get('authentication.secret'),
      }
      return {
        refreshToken: null,
        accessToken: this.jwtService.sign({ id: user.objectId }, jwtOptions),
        socialLogin: true,
        ...user,
      }
    } catch (e) {
      this.logger.error(`createSocialToken error ${e.message ?? e}`)
      throw new UnauthorizedException({
        message: 'invalid jwt token',
        data: {},
      })
    }
  }

  async comparePassword(original: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(original, hashed)
  }

  async validateUser(username: string, pass: string): Promise<any> {
    let user: IUser
    try {
      user = await this.usersService.getByPhoneNumberOrEmail(username)
    } catch (error) {
      this.logger.error(`get user: ${JSON.stringify(error)}`)
      throw new UnauthorizedException({
        message: 'username or password is invalid',
        data: {},
      })
    }

    if (!user) {
      throw new UnauthorizedException({
        message: 'username or password is invalid',
        data: {},
      })
    }


    if (user.status !== 'active') {
      throw new ForbiddenException()
    }

    const isMatchPassword = await this.comparePassword(pass, user.password)
    if (isMatchPassword) {
      user.latestLogin = new Date()
      await this.usersService.update(user)
      return user
    }
  }
}
