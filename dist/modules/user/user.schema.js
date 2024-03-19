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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const nanoid_1 = require("nanoid");
let User = class User {
};
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        default: nanoid_1.nanoid,
    }),
    __metadata("design:type", String)
], User.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        enum: ['นาย', 'นาง', 'นางสาว', null],
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "prefix", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "code", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "driverLicense", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "driverLicenseExpire", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "position", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "imgProfile", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        enum: ['M', 'F', null],
    }),
    __metadata("design:type", String)
], User.prototype, "sex", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "address1", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "address2", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], User.prototype, "jobSign", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], User.prototype, "jobOut", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        index: true,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "depot", void 0);
__decorate([
    mongoose_1.Prop({
        type: [String],
        default: ['user'],
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['active', 'disabled'],
        default: 'active',
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
        default: null,
    }),
    __metadata("design:type", Date)
], User.prototype, "latestLogin", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "appleId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "facebookId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "vehicle", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "createdBy", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "updatedBy", void 0);
User = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        versionKey: false,
        collection: 'users',
    })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map