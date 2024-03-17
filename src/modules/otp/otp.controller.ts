import {
  BadRequestException,
  Body,
  Controller,
  Get, HttpCode,
  Inject,
  Param, Post,
} from '@nestjs/common'
import {
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'
import { CommonResponse } from '../../decorators/common-response.decorator'
import { OtpService } from './otp.service'
import { Otp } from './otp.schema'
import dayjs from 'dayjs'
import OtpEmailResponseDto from './dto/otp-email-response.dto'
import OtpPhoneResponseDto from './dto/otp-phone-response.dto'
import VerifyOtpDto from './dto/verify-otp.dto'
import { UserService } from '../user/user.service'

const Module = 'Otp'

@Controller('otp')
export class OtpController {
  @Inject() private readonly otpService: OtpService
  @Inject() private readonly userService: UserService

  @Get('/request-phone-otp/:phoneNumber')
  @ApiOperation({ 'summary': 'ขอ otp (phone number)' })
  @ApiParam({ name: 'phoneNumber', type: String, required: true })
  @CommonResponse(Module, { successType: OtpPhoneResponseDto })
  async requestPhoneOtp(
    @Param() param: { phoneNumber: string },
  ): Promise<OtpPhoneResponseDto> {
    const { phoneNumber } = param
    const { ref, otp } = await this.otpService.generateOtp()
    const createBody: Otp = {
      username: phoneNumber,
      verifyCode: ref,
      verifyNumber: otp,
      isVerify: false,
      expire: dayjs().add(5, 'minute').toDate(),
    }
    await this.otpService.create(createBody)
    const message = `OTP = ${otp} [รหัสอ้างอิง : ${ref} ] เพื่อทำการยืนยันผ่าน TSB Go`
    await this.otpService.sendSms(message, ref, phoneNumber)
    return {
      verifyCode: ref,
      phoneNumber,
    }
  }

  @Get('/otp-reset-pass/:phoneNumber')
  @ApiOperation({ 'summary': 'ขอ otp (phone number resetpass)' })
  @ApiParam({ name: 'phoneNumber', type: String, required: true })
  @CommonResponse(Module, { successType: OtpPhoneResponseDto })
  async requestPhoneOtpResetPass(
    @Param() param: { phoneNumber: string },
  ): Promise<OtpPhoneResponseDto> {
    const { phoneNumber } = param
    const user = await this.userService.getByPhoneNumber(phoneNumber)
    if (!user) {
      throw new BadRequestException({
        message: 'not found user.',
      })
    }
    // const user = await this.
    const { ref, otp } = await this.otpService.generateOtp()
    const createBody: Otp = {
      username: phoneNumber,
      verifyCode: ref,
      verifyNumber: otp,
      isVerify: false,
      expire: dayjs().add(5, 'minute').toDate(),
    }
    await this.otpService.create(createBody)
    const message = `OTP = ${otp} [รหัสอ้างอิง : ${ref} ] เพื่อทำการยืนยันผ่าน TSB Go`
    await this.otpService.sendSms(message, ref, phoneNumber)
    return {
      verifyCode: ref,
      phoneNumber,
    }
  }

  @Get('/request-email-otp/:email')
  @ApiOperation({ 'summary': 'ขอ otp (email)' })
  @CommonResponse(Module, { successType: OtpEmailResponseDto })
  @ApiParam({ name: 'email', type: String, required: true })
  async requestEmailOtp(
    @Param() param: { email: string },
  ): Promise<OtpEmailResponseDto> {
    const { email } = param
    const { ref, otp } = await this.otpService.generateOtp()
    const createBody: Otp = {
      username: email,
      verifyCode: ref,
      verifyNumber: otp,
      isVerify: false,
      expire: dayjs().add(5, 'minute').toDate(),
    }
    await this.otpService.create(createBody)
    const message = `OTP = ${otp} [รหัสอ้างอิง : ${ref} ] เพื่อทำการยืนยันผ่าน TSB Go`
    await this.otpService.sendEmail(message, ref, email)
    return {
      verifyCode: ref,
      email,
    }
  }

  @HttpCode(200)
  @Post('/verify/:username')
  @ApiOperation({ 'summary': 'ยืนยัน otp (username = email , phoneNumber)' })
  @CommonResponse(Module, { successType: { isVerify: Boolean } })
  @ApiParam({ name: 'username', type: String, required: true })
  async verifyOtp(
    @Param() params: { username: string },
    @Body() body: VerifyOtpDto,
  ): Promise<boolean> {
    const otp: Otp = await this.otpService.getModel().findOne({
      username: params.username,
      verifyCode: body.verifyCode,
      verifyNumber: body.verifyNumber,
      expire: {
        $gte: dayjs().toDate(),
      },
    })
    if (!otp) {
      throw new BadRequestException({
        message: 'invalid otp or expired',
      })
    }
    await this.otpService.getModel().updateOne(
      {
        username: params.username,
        verifyCode: body.verifyCode,
        verifyNumber: body.verifyNumber,
      },
      { isVerify: true },
    )
    return true
  }
}
