import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { nanoid } from 'nanoid'


export type FeedbackDocument = FeedBack & Document

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'feedback',
})
export class FeedBack {
  @Prop({
    index: true,
    type: String,
    unique: true,
    default: nanoid,
  })
  objectId?: string

  @Prop({
    index: true,
    type: String,
  })
  title?: string

  @Prop({
    index: true,
    type: String,
  })
  description?: string

  @Prop({
    index: true,
    type: Date,
  })
  startDate?: Date

  @Prop({
    index: true,
    type: Date,
  })
  endDate?: Date

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

  @Prop({
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
  })
  status?: string

  @Prop({
    type: [mongoose.Schema.Types.Mixed],
  })
  questions?: {
    type: 'star' | 'choice' | 'freeText'
    index: number,
    choices: {
      value: string | number
    }[]
  }[]

  @Prop({
    type: [mongoose.Schema.Types.Mixed],
  })
  answers?: {
    createdAt: Date,
    user: string,
    answers: {
      value: string | number,
      questionIndex: number,
    }[]
  }[]
}

export const FeedBackSchema = SchemaFactory.createForClass(FeedBack)
