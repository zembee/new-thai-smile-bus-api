import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  InternalServerErrorException,
  Post,
  Put,
  Delete,
  Param,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'
import CreateUserDto from './dto/create-user.dto'
import UserResponseDto from './dto/user-response.dto'
import { CommonResponse } from '../../decorators/common-response.decorator'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { User } from './users.decorator'
import { OtpService } from '../otp/otp.service'
import UpdateUserDto from './dto/update-user.dto'
import UpdatePasswordDto from './dto/update-password.dto'
import { IUser } from './user.schema'
import DriverTimelineDto from './dto/driver-timeline.dto'
import { DriverTimeline } from './driver-timeline.schema'
import ResetPasswordDto from './dto/reset-password.dto'
import { VehicleService } from '../vehicle/vehicle.service'
import DriverTimelineListDto from './dto/driver-timeline-list.dto'
import { Vehicle } from '../vehicle/vehicle.schema'
import bcrypt from 'bcrypt'

const Module = 'User'

@Controller('user')
export class UserController {
  @Inject() private readonly userService: UserService
  @Inject() private readonly otpService: OtpService
  @Inject() private readonly vehicleService: VehicleService

  @HttpCode(200)
  @Post('register')
  @ApiOperation({ 'summary': 'สมัครสมาชิก **กรอกอีเมลล์หรือเบอร์โทรอย่างใดอย่างหนึ่งได้' })
  @CommonResponse(Module, { successType: UserResponseDto })
  async createBetTransaction(
    @Body() body: CreateUserDto,
  ): Promise<UserResponseDto> {
    const {
      phoneNumber = null,
      email = null,
      password,
      firstName,
      lastName,
      verifyCode,
    } = body

    const isVerify = await this.otpService.getModel().findOne({
      verifyCode,
      isVerify: true,
    })

    if (!isVerify) {
      throw new BadRequestException({
        message: 'otp is not verify',
      })
    }

    if ((phoneNumber === '' || phoneNumber) && (email === '' && email)) {
      throw new BadRequestException({
        message: 'enter email or password.',
      })
    }

    if (phoneNumber !== '' && phoneNumber !== null) {
      const existPhoneNumber = await this.userService.getByPhoneNumber(phoneNumber)
      if (existPhoneNumber) {
        throw new BadRequestException({
          message: 'phone number is exist.',
          data: phoneNumber,
        })
      }
    }

    if (email !== '' && email !== null) {
      const existEmail = await this.userService.getByEmail(email)
      if (existEmail) {
        throw new BadRequestException({
          message: 'email is exist.',
          data: email,
        })
      }
    }

    try {
      return this.userService.register({
        phoneNumber,
        email,
        password,
        firstName,
        lastName,
      })
    } catch (e) {
      throw new InternalServerErrorException(e.message || e)
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('/me')
  @ApiOperation({ 'summary': 'ข้อมูลสมาชิก' })
  @CommonResponse(Module, { successType: UserResponseDto })
  async me(
    @User() user: UserResponseDto,
  ): Promise<UserResponseDto> {
    return user
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Put('/me')
  @ApiOperation({ 'summary': 'แก้ไขข้อมูลสมาชิก' })
  @CommonResponse(Module, { successType: UserResponseDto })
  async updateInfo(
    @User() user: UserResponseDto,
    @Body() body: UpdateUserDto,
  ): Promise<{ googleId?: string; lastName: string; code: string; depot?: string; prefix: string; roles?: string[]; latestLogin?: Date; vehicle?: string; jobSign?: Date; password: string; driverLicense?: string; driverLicenseExpire?: string; objectId?: string; email: string; updatedBy?: string; address2?: string; address1?: string; sex?: string; facebookId?: string; birthDate?: Date; appleId?: string; token?: string; firstName: string; phoneNumber: string; createdBy?: string; jobOut?: Date; position?: string; username: string; status?: string }> {
    const findUser = await this.userService.getByObjectId(user.objectId)

    if (findUser.email) {
      delete body.email
    }

    if (findUser.phoneNumber) {
      delete body.email
    }

    if (body.phoneNumber && body.phoneNumber !== '') {
      const existPhoneNumber = await this.userService.getByPhoneNumber(body.phoneNumber)
      if (existPhoneNumber && existPhoneNumber.objectId !== user.objectId) {
        throw new BadRequestException({
          message: 'phone number is exist.',
          data: body.phoneNumber,
        })
      }
    }

    if (body.email && body.email !== '') {
      const existEmail = await this.userService.getByEmail(body.email)
      if (existEmail && existEmail.objectId !== user.objectId) {
        throw new BadRequestException({
          message: 'email is exist.',
          data: body.email,
        })
      }
    }

    const updateUser = {
      ...findUser,
      ...body,
    }

    await this.userService.update(updateUser)

    return {
      ...findUser,
      ...body,
    }
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Put('change-password')
  @ApiOperation({ 'summary': 'เปลี่ยนรหัสผ่าน' })
  @CommonResponse(Module, { successType: Boolean })
  async updatePassword(
    @User() user: IUser,
    @Body() body: UpdatePasswordDto,
  ): Promise<boolean> {
    const {
      password,
      oldPassword,
    } = body

    const existsUser = await this.userService.getModel().findOne({ objectId: user.objectId }).lean()
    const newPasswordHash = await this.userService.hashPassword(password)
    const isMatchPassword = await this.comparePassword(oldPassword, existsUser.password)

    if (!isMatchPassword) {
      throw new BadRequestException({ message: 'invalid old password.' })
    }

    try {
      existsUser.password = newPasswordHash
      const updated = await this.userService.update(existsUser)
      return !!updated.nModified
    } catch (e) {
      throw new InternalServerErrorException(e.message || e)
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete('/:objectId')
  @ApiOperation({ 'summary': 'ลบข้อมูลสมาชิก' })
  @CommonResponse(Module, { successType: Boolean})
  @ApiParam({ type: String, name: 'objectId' })
  async deleteUser(
    @Param('objectId') objectId: string,
  ): Promise<any> {
   
    const users = await this.userService.getModel().findOne({ objectId }).lean()
    if (!users) {
      throw new BadRequestException({
        message: 'users not exists.',
      })
    }


    const del = await this.userService.getModel().deleteOne({ objectId })
    if(!!del.deletedCount){
      return {
        status: true,
        message: 'users delete success.',
      }
    }else{
      return {
        status: false,
        message: 'users delete exists.',
      } 
    }

  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('driver/check-in')
  @ApiOperation({ 'summary': 'เข้า - ออกงาน' })
  @CommonResponse(Module, { successType: DriverTimeline })
  async driverCheckIn(
    @User() user: IUser,
    @Body() body: DriverTimelineDto,
  ): Promise<DriverTimeline> {
    const {
      action,
      bus,
      status,
    } = body

    if (!user.roles.includes('driver') && !user.roles.includes('conductor') && !user.roles.includes('ticketer')) {
      throw new UnauthorizedException()
    }

    const createBody: DriverTimeline = {
      bus,
      status,
      user: user.objectId,
    }
    try {
      let driverTimeLine: DriverTimeline
      if (action === 'check-out') {
        driverTimeLine = await this.userService.getLatestDriverTimeline(user.objectId)
        if (driverTimeLine) {
          await this.userService.updateCheckOut(driverTimeLine.objectId)
        }
        await Promise.all([
          this.userService.getModel().updateOne({ objectId: user.objectId }, { $set: { vehicle: null } }),
          this.vehicleService.getModel().updateOne({ objectId: bus }, {
            $set: {
              employee: null,
            },
          }),
        ])
        return driverTimeLine
      }

      driverTimeLine = await this.userService.createDriverTimeline({
        ...createBody,
        checkIn: new Date(),
      })
      await Promise.all([
        this.userService.getModel().updateOne({ objectId: user.objectId }, { $set: { vehicle: bus } }),
        this.vehicleService.getModel().updateOne({ objectId: bus }, {
          $set: {
            routeStatus: status,
          },
          $push: {
            employee: user,
          },
        }),
      ])
      return driverTimeLine
    } catch (e) {
      throw new InternalServerErrorException(e.message || e)
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('driver/timeline')
  @ApiOperation({ 'summary': 'ตารางเข้า - ออกงาน' })
  @CommonResponse(Module, { successType: DriverTimeline })
  async driverTimeline(
    @User() user: IUser,
    @Query() query: DriverTimelineListDto,
  ): Promise<any> {
    const {
      startDate,
      endDate,
    } = query

    if (!user.roles.includes('driver') && !user.roles.includes('conductor') && !user.roles.includes('ticketer')) {
      throw new UnauthorizedException()
    }

    let bus: Vehicle = null
    if (user.vehicle) {
      bus = await this
        .vehicleService
        .getModel()
        .findOne(
          {
            objectId: user.vehicle,
          },
          {
            'speed': 1,
            'name': 1,
            'number': 1,
            'type': 1,
          },
        )
        .lean()
    }
    bus = bus === null ? null : bus
    try {
      const timeline = await this.userService.findDriverTimeline({
        user: user.objectId,
        createdAt: {
          $gte: new Date(startDate * 1000),
          $lte: new Date(endDate * 1000),
        },
      })
      return {
        bus,
        timeline,
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message || e)
    }
  }

  @HttpCode(200)
  @Put('reset-password')
  @ApiOperation({ 'summary': 'รีเซ็ตรหัสผ่าน' })
  @CommonResponse(Module, { successType: Boolean })
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<boolean> {
    const {
      username,
      password,
      verifyCode,
    } = body

    const isEmail = this.validateEmail(username)
    let user = await this.userService.getModel().findOne({ phoneNumber: username })
    if (isEmail) {
      user = await this.userService.getModel().findOne({ email: username })
    }

    if (!user) {
      throw new BadRequestException({
        message: 'user not found.',
      })
    }

    const isVerify = await this.otpService.getModel().findOne({
      verifyCode,
      isVerify: true,
    })

    if (!isVerify || isVerify.username !== username) {
      throw new BadRequestException({
        message: 'otp is not verify',
      })
    }

    try {
      const findUser = await this.userService.getByObjectId(user.objectId)
      const hashPassword = await this.userService.hashPassword(password)
      findUser.password = hashPassword
      await this.userService.update(findUser)
      return true
    } catch (e) {
      throw new InternalServerErrorException(e.message || e)
    }
  }

  async comparePassword(original: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(original, hashed)
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }
}
