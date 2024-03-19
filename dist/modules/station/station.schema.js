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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationSchema = exports.Station = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const nanoid_1 = require("nanoid");
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
let Station = class Station {
};
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        unique: true,
        default: nanoid_1.nanoid,
    }),
    __metadata("design:type", String)
], Station.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], Station.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], Station.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: Location,
    }),
    __metadata("design:type", Location)
], Station.prototype, "location", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['active', 'disabled'],
        default: 'active',
        index: true
    }),
    __metadata("design:type", String)
], Station.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Station.prototype, "createdBy", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Station.prototype, "updatedBy", void 0);
Station = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        versionKey: false,
        collection: 'station',
    })
], Station);
exports.Station = Station;
exports.StationSchema = mongoose_1.SchemaFactory.createForClass(Station);
exports.StationSchema.index({ 'location': '2dsphere' });
exports.StationSchema.index({ name: 1 });
//# sourceMappingURL=station.schema.js.map