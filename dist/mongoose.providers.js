"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const user_schema_1 = require("./modules/user/user.schema");
const otp_schema_1 = require("./modules/otp/otp.schema");
const route_schema_1 = require("./modules/route/route.schema");
const driver_timeline_schema_1 = require("./modules/user/driver-timeline.schema");
const announcement_schema_1 = require("./modules/announcement/announcement.schema");
const vehicle_schema_1 = require("./modules/vehicle/vehicle.schema");
const station_schema_1 = require("./modules/station/station.schema");
const feedback_schema_1 = require("./modules/feedback/feedback.schema");
exports.models = [
    {
        name: user_schema_1.User.name,
        schema: user_schema_1.UserSchema,
    },
    {
        name: otp_schema_1.Otp.name,
        schema: otp_schema_1.OtpSchema,
    },
    {
        name: vehicle_schema_1.Vehicle.name,
        schema: vehicle_schema_1.VehicleSchema,
    },
    {
        name: route_schema_1.Route.name,
        schema: route_schema_1.RouteSchema,
    },
    {
        name: station_schema_1.Station.name,
        schema: station_schema_1.StationSchema,
    },
    {
        name: driver_timeline_schema_1.DriverTimeline.name,
        schema: driver_timeline_schema_1.DriverTimelineSchema,
    },
    {
        name: announcement_schema_1.Announcement.name,
        schema: announcement_schema_1.AnnouncementSchema,
    },
    {
        name: feedback_schema_1.FeedBack.name,
        schema: feedback_schema_1.FeedBackSchema,
    },
];
//# sourceMappingURL=mongoose.providers.js.map