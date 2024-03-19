import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { nanoid } from 'nanoid'


export type OtpDocument = Otp & Document

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'otp',
})
export class Otp {
  @Prop({
    index: true,
    type: String,
    default: nanoid,
  })
  objectId?: string

  @Prop({
    index: true,
    type: String,
    required: true,
  })
  verifyCode: string

  @Prop({
    index: true,
    type: String,
    required: true,
  })
  verifyNumber: string

  @Prop({
    type: String,
    default: false,
  })
  isVerify: boolean

  @Prop({
    type: String,
    default: false,
  })
  username?: string

  @Prop({
    type: Date,
    required: true,
  })
  expire: Date
}

export const OtpSchema = SchemaFactory.createForClass(Otp)
