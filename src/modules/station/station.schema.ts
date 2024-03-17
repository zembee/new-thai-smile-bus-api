import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { nanoid } from 'nanoid'


export type StationDocument = Station & Document

class Location {
  @Prop({
    type: String,
    default: 'Point',
  })
  type: string

  @Prop({
    type: [Number],
    default: null,
  })
  coordinates: number[]
}

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'station',
})
export class Station {
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
  name: string

  @Prop({
    index: true,
    type: String,
  })
  description: string

  @Prop({
    index: true,
    type: Location,
  })
  location: Location

  @Prop({
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
    index: true
  })
  status?: string

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

export const StationSchema = SchemaFactory.createForClass(Station)
StationSchema.index({ 'location': '2dsphere' })
StationSchema.index({ name: 1 })
