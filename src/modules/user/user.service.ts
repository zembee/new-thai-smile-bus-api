import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  Model,
  UpdateWriteOpResult,
} from 'mongoose'
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import {
  IUser,
  User,
  UserDocument,
} from './user.schema'
import { CWLogger } from '../logger/cwlogger.service'
import CreateUserDto from './dto/create-user.dto'
import UserResponseDto from './dto/user-response.dto'
import { DriverTimeline, DriverTimelineDocument } from './driver-timeline.schema'

@Injectable()
export class UserService {
  private readonly logger: CWLogger = new CWLogger(UserService.name)

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(DriverTimeline.name) private driverTimeline: Model<DriverTimelineDocument>,
    private readonly configService: ConfigService,
  ) {
  }

  getModel(): Model<UserDocument> {
    return this.userModel
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async register(body: CreateUserDto): Promise<UserResponseDto> {
    const password = await this.hashPassword(body.password)
    const user = await this.userModel.create({
      ...body,
      password,
    })
    return JSON.parse(JSON.stringify(user))
  }

  async getByEmail(email: string): Promise<UserResponseDto> {
    return this.userModel.findOne({ email }).select({ password: 0 }).lean()
  }

  async getByObjectId(objectId: string): Promise<IUser> {
    return this.userModel.findOne({ objectId }).select({ password: 0 }).lean()
  }

  async getByPhoneNumber(phoneNumber: string): Promise<UserResponseDto> {
    return this.userModel.findOne({ phoneNumber }).select({ password: 0 }).lean()
  }

  async getByPhoneNumberOrEmail(username): Promise<IUser> {
    return this.userModel.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username },
        { phoneNumber: username },
      ],
    }).lean()
  }

  async update(user: IUser): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ objectId: user.objectId }, user)
  }

  async findOne(condition: any): Promise<UserResponseDto> {
    return this.userModel.findOne(condition).select({ password: 0 }).lean()
  }

  //
  // async updateRoleToDriver(
  //   objectId: string,
  //   licenseNumber: string,
  //   identityNumber: string,
  //   birthDate: Date,
  // ): Promise<UpdateWriteOpResult> {
  //   return this
  //     .userModel
  //     .updateOne(
  //       {
  //         objectId,
  //       },
  //       {
  //         $set: {
  //           licenseNumber,
  //           identityNumber,
  //           birthDate,
  //         },
  //       },
  //     )
  // }
  //
  async createDriverTimeline(
    body: DriverTimeline,
  ): Promise<DriverTimeline> {
    return this.driverTimeline.create(body)
  }

  async getLatestDriverTimeline(
    user: string,
  ): Promise<DriverTimeline> {
    return this.driverTimeline.findOne({
      user,
      checkOut: null,
    }).sort({ createdAt: -1 }).lean()
  }

  async updateCheckOut(
    objectId: string,
  ): Promise<any> {
    return this.driverTimeline.updateOne({ objectId }, {
      $set: { checkOut: new Date() },
    })
  }

  async findDriverTimeline(
    query: any,
  ): Promise<DriverTimeline[]> {
    return this.driverTimeline.find(query).select({ bus: 0, user: 0 }).sort({ createdAt: -1 }).lean()
  }
}
