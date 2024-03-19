import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { nanoid } from 'nanoid'
import { StationSchema } from '../station/station.schema'

export type VehicleDocument = Vehicle & Document

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
  collection: 'vehicle',
})
export class Vehicle {
  @Prop({
    index: true,
    type: String,
    unique: true,
    default: nanoid,
  })
  objectId?: string

  @Prop({
    type: String,
    enum: ['bus', 'taxi', 'van'],
    default: null,
  })
  type?: string

  @Prop({
    type: String,
    enum: ['go', 'return'],
    default: null,
  })
  routeStatus?: string

  @Prop({
    type: String,
    default: null,
  })
  name?: string

  @Prop({
    type: String,
    default: null,
  })
  number?: string

  @Prop({
    type: String,
    default: null,
  })
  chassisNumber?: string

  @Prop({
    type: String,
    default: null,
  })
  motorNumber?: string

  @Prop({
    type: String,
    default: null,
  })
  brand?: string

  @Prop({
    type: String,
    default: null,
  })
  addressInstall?: string

  @Prop({
    type: String,
    default: null,
  })
  registerNumber?: string

  @Prop({
    index: true,
    type: String,
    default: null,
  })
  gpsUnitId: string

  @Prop({
    index: true,
    type: [mongoose.Schema.Types.Mixed],
  })
  employee?: any[]

  @Prop({
    type: String,
    index: true,
    default: null,
  })
  route?: any

  @Prop({
    type: String,
    index: true,
    default: null,
  })
  depot?: string

  @Prop({
    type: Date,
    default: null,
  })
  latestActive?: Date

  @Prop({
    type: Location,
  })
  location?: Location

  @Prop({
    type: Number,
    default: 0,
  })
  speed?: number

  @Prop({
    type: Boolean,
    default: 0,
  })
  engineStatus?: boolean

  @Prop({
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
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

export const VehicleSchema = SchemaFactory.createForClass(Vehicle)
StationSchema.index({ 'location': '2dsphere' })
