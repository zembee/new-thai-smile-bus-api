import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  Model,
} from 'mongoose'
import { ConfigService } from '@nestjs/config'
import { CWLogger } from '../logger/cwlogger.service'
import {
  Otp,
  OtpDocument,
} from './otp.schema'
import otpGenerator from 'otp-generator'
import axios from 'axios'
import nodemailer from 'nodemailer'


@Injectable()
export class OtpService {
  private readonly logger: CWLogger = new CWLogger(OtpService.name)

  constructor(
    @InjectModel('Otp') private otpModel: Model<OtpDocument>,
    private readonly configService: ConfigService,
  ) {
  }

  getModel(): Model<OtpDocument> {
    return this.otpModel
  }

  async create(createBody: Otp): Promise<Otp> {
    return this.otpModel.create(createBody)
  }

  generateOtp(): { ref: string, otp: string } {
    const ref = otpGenerator.generate(5, { upperCase: false, specialChars: false })
    let otp = Math.floor(100000 + Math.random() * 900000).toString()
    if (process.env.MOCK_OTP === '1') {
      otp = '111111'
    }
    return { ref, otp }
  }

  async sendSms(message: string, ref: string, telNo: string): Promise<void> {

    const headers = {
      'Content-Type': 'Application/json',
      'Accept-Charset': 'UTF8',
      'Authorization': 'Basic VFNCMDE6VFNCMTIzNCE=',
    }

    const data = {
      'SENDER': 'TSB Go',
      'TELNO': telNo,
      'MESSAGE': message,
      'REFNO': ref,
      'REMARK': '',
    }

    const url = 'https://tvdr-service.tvdirect.tv/ApiPartnerSMS-Test/Partner/SendSMS'

    await axios.post(url, data, { headers })
    return
  }

  async sendEmail(message: string, ref: string, destination: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'thaismilebus.tsb@gmail.com',
        pass: 'tHaismilebuspass',
      },
    })

    await transporter.sendMail({
      from: 'TSB Go',
      to: destination,
      subject: 'otp verify',
      text: message,
    })
  }

}
