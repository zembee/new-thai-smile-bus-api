import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { nanoid } from 'nanoid'


export type DriverTimelineDocument = DriverTimeline & Document

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'driver-timeline',
})
export class DriverTimeline {
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
  user: string

  @Prop({
    type: Date,
    default: null
  })
  checkIn?: any

  @Prop({
    type: Date,
    default: null
  })
  checkOut?: any

  @Prop({
    type: String,
    default: null
  })
  status: string

  @Prop({
    type: String,
    default: null
  })
  remark?: string

  @Prop({
    type: String,
    default: null
  })
  bus: string

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

  createdAt?: Date
  updatedAt?: Date
}

export const DriverTimelineSchema = SchemaFactory.createForClass(DriverTimeline)
