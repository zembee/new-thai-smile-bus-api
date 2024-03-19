import {
  User,
  UserSchema,
} from './modules/user/user.schema'
import { Otp, OtpSchema } from './modules/otp/otp.schema'
import { Route, RouteSchema } from './modules/route/route.schema'
import { DriverTimeline, DriverTimelineSchema } from './modules/user/driver-timeline.schema'
import { Announcement, AnnouncementSchema } from './modules/announcement/announcement.schema'
import { Vehicle, VehicleSchema } from './modules/vehicle/vehicle.schema'
import { Station, StationSchema } from './modules/station/station.schema'
import { FeedBack, FeedBackSchema } from './modules/feedback/feedback.schema'

export const models = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Otp.name,
    schema: OtpSchema,
  },
  {
    name: Vehicle.name,
    schema: VehicleSchema,
  },
  {
    name: Route.name,
    schema: RouteSchema,
  },
  {
    name: Station.name,
    schema: StationSchema,
  },
  {
    name: DriverTimeline.name,
    schema: DriverTimelineSchema,
  },
  {
    name: Announcement.name,
    schema: AnnouncementSchema,
  },
  {
    name: FeedBack.name,
    schema: FeedBackSchema,
  },
]

