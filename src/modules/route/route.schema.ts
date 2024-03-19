import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { nanoid } from 'nanoid'
import * as mongoose from 'mongoose'


export type RouteDocument = Route & Document

class Stations {
  @Prop({
    type: String,
    default: null,
    index: true,
  })
  objectId: string

  @Prop({
    type: String,
    enum: ['go', 'return'],
    required: true,
    index: true,
  })
  type?: string

  @Prop({
    type: Number,
    default: 0,
    index: true,
  })
  index: number

}

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'route',
})
export class Route {
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
    unique: true,
  })
  name: string

  @Prop({
    index: true,
    type: String,
  })
  description: string
  
  @Prop({
    index: true,
    type: [
      {
        _id: false,
        objectId: {
          type: String,
          index: true,
        },
        index: {
          type: Number,
          default: 0,
          index: true,
        },
        type: {
          index: true,
          type: String,
          enum: ['go', 'return'],
        },
      },
    ],
    default: [],
  })
  stations: Stations[]

  @Prop({
    index: true,
    default: null,
    type: mongoose.Schema.Types.Mixed,
  })
  history: mongoose.Schema.Types.Mixed

  @Prop({
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
    index: true,
  })
  status: string

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

export const RouteSchema = SchemaFactory.createForClass(Route)
