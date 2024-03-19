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
exports.AnnouncementSchema = exports.Announcement = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const nanoid_1 = require("nanoid");
let Announcement = class Announcement {
};
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        unique: true,
        default: nanoid_1.nanoid,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "url", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Announcement.prototype, "subtitle", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
        required: true,
    }),
    __metadata("design:type", Date)
], Announcement.prototype, "startDate", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
        required: true,
    }),
    __metadata("design:type", Date)
], Announcement.prototype, "endDate", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['active', 'disabled'],
        default: 'active',
    }),
    __metadata("design:type", String)
], Announcement.prototype, "status", void 0);
Announcement = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        versionKey: false,
        collection: 'announcement',
    })
], Announcement);
exports.Announcement = Announcement;
exports.AnnouncementSchema = mongoose_1.SchemaFactory.createForClass(Announcement);
exports.AnnouncementSchema.index({ createdAt: -1 });
//# sourceMappingURL=announcement.schema.js.map