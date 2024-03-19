"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleSchema = exports.Vehicle = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const station_schema_1 = require("../station/station.schema");
class Location {
}
__decorate([
    mongoose_1.Prop({
        type: String,
        default: 'Point',
    }),
    __metadata("design:type", String)
], Location.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({
        type: [Number],
        default: null,
    }),
    __metadata("design:type", Array)
], Location.prototype, "coordinates", void 0);
let Vehicle = class Vehicle {
};
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        unique: true,
        default: nanoid_1.nanoid,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['bus', 'taxi', 'van'],
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['go', 'return'],
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "routeStatus", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "number", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "chassisNumber", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "motorNumber", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "brand", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "addressInstall", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "registerNumber", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "gpsUnitId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: [mongoose_2.default.Schema.Types.Mixed],
    }),
    __metadata("design:type", Array)
], Vehicle.prototype, "employee", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        default: null,
    }),
    __metadata("design:type", Object)
], Vehicle.prototype, "route", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "depot", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
        default: null,
    }),
    __metadata("design:type", Date)
], Vehicle.prototype, "latestActive", void 0);
__decorate([
    mongoose_1.Prop({
        type: Location,
    }),
    __metadata("design:type", Location)
], Vehicle.prototype, "location", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], Vehicle.prototype, "speed", void 0);
__decorate([
    mongoose_1.Prop({
        type: Boolean,
        default: 0,
    }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "engineStatus", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['active', 'disabled'],
        default: 'active',
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "createdBy", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "updatedBy", void 0);
Vehicle = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        versionKey: false,
        collection: 'vehicle',
    })
], Vehicle);
exports.Vehicle = Vehicle;
exports.VehicleSchema = mongoose_1.SchemaFactory.createForClass(Vehicle);
station_schema_1.StationSchema.index({ 'location': '2dsphere' });
//# sourceMappingURL=vehicle.schema.js.map