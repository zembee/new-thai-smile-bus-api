import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { nanoid } from 'nanoid'


export type AnnouncementDocument = Announcement & Document

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'announcement',
})
export class Announcement {
  @Prop({
    index: true,
    type: String,
    unique: true,
    default: nanoid,
  })
  objectId?: string

  @Prop({
    type: String,
  })
  type: string

  @Prop({
    type: String,
  })
  url: string

  @Prop({
    type: String,
    required: true,
  })
  title: string

  @Prop({
    type: String,
    required: true,
  })
  subtitle: string

  @Prop({
    type: Date,
    required: true,
  })
  startDate: Date

  @Prop({
    type: Date,
    required: true,
  })
  endDate: Date

  @Prop({
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
  })
  status: string
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement)
AnnouncementSchema.index({ createdAt: -1 })
