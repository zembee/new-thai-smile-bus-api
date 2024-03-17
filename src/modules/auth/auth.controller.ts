import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common'


import { AuthService } from './auth.service'
import { RateLimit } from 'nestjs-rate-limit'
import { LocalAuthGuard } from './local-auth.guard'
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthLocalDto } from './dto/auth-local.dto'
import { IUser } from '../user/user.schema'
import { SocialAuthDto } from './dto/social-auth.dto'


@Controller('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {

  }

  @RateLimit({
    points: 5,
    pointsConsumed: 1,
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiTags('Authentication')
  @ApiOkResponse({ description: 'Login Complete' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @ApiTooManyRequestsResponse({ description: 'Too many requests' })
  @Post('/login')
  @ApiBody({ type: AuthLocalDto })
  async login(
    @Request() req: { user: IUser, headers: Record<string, any> },
  ): Promise<{ refreshToken: string, accessToken: string }> {
    return this.authService.createToken(req.user)
  }

  @RateLimit({
    points: 5,
    pointsConsumed: 1,
  })
  @HttpCode(HttpStatus.OK)
  @ApiTags('Authentication')
  @ApiOkResponse({ description: 'Login Complete' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @ApiTooManyRequestsResponse({ description: 'Too many requests' })
  @Post('/login/social/')
  async loginSocial(
    @Body() body: SocialAuthDto,
  ): Promise<{ refreshToken: string, accessToken: string, socialLogin: boolean }> {
    return this.authService.createSocialToken(body)
  }
}
