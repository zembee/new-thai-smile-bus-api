import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { nanoid } from 'nanoid'


export type UserDocument = User & Document

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'users',
})
export class User {
  @Prop({
    index: true,
    type: String,
    default: nanoid,
  })
  objectId?: string

  @Prop({
    index: true,
    type: String,
    default: null,
  })
  phoneNumber: string

  @Prop({
    index: true,
    type: String,
    default: null,
  })
  email: string

  @Prop({
    index: true,
    type: String,
    default: null,
  })
  username: string

  @Prop({
    type: String,
    required: true,
  })
  password: string

  @Prop({
    type: String,
    index: true,
    enum: ['นาย', 'นาง', 'นางสาว', null],
    default: null,
  })
  prefix: string

  @Prop({
    type: String,
    index: true,
    default: null,
  })
  firstName: string

  @Prop({
    type: String,
    index: true,
    default: null,
  })
  lastName: string

  @Prop({
    type: String,
    index: true,
    default: null,
  })
  code: string

  @Prop({
    index: true,
    type: String,
  })
  driverLicense?: string

  @Prop({
    index: true,
    type: String,
  })
  driverLicenseExpire?: string

  @Prop({
    index: true,
    type: String,
  })
  position?: string

  @Prop({
    type: String,
  })
  imgProfile?: string

  @Prop({
    type: Date,
  })
  birthDate?: Date

  @Prop({
    type: String,
    index: true,
    enum: ['M', 'F', null],
  })
  sex?: string

  @Prop({
    type: String,
  })
  address1?: string

  @Prop({
    type: String,
  })
  address2?: string

  @Prop({
    type: Date,
  })
  jobSign?: Date

  @Prop({
    type: Date,
  })
  jobOut?: Date

  @Prop({
    type: String,
    default: null,
  })
  token?: string

  @Prop({
    type: String,
    index: true,
    default: null,
  })
  depot?: string

  @Prop({
    type: [String],
    default: ['user'],
  })
  roles?: string[]

  @Prop({
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
  })
  status?: string

  @Prop({
    type: Date,
    default: null,
  })
  latestLogin?: Date

  @Prop({
    index: true,
    type: String,
  })
  appleId?: string

  @Prop({
    index: true,
    type: String,
  })
  googleId?: string

  @Prop({
    index: true,
    type: String,
  })
  facebookId?: string

  @Prop({
    index: true,
    type: String,
  })
  vehicle?: string

  @Prop({
    type: String,
    default: null,
  })
  createdBy?: string

  @Prop({
    type: String,
    default: null,
  })
  updatedBy?: string


}

export type IUser = User
export const UserSchema = SchemaFactory.createForClass(User)
