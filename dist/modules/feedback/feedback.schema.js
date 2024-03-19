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
exports.FeedBackSchema = exports.FeedBack = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
let FeedBack = class FeedBack {
};
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        unique: true,
        default: nanoid_1.nanoid,
    }),
    __metadata("design:type", String)
], FeedBack.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], FeedBack.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], FeedBack.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: Date,
    }),
    __metadata("design:type", Date)
], FeedBack.prototype, "startDate", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: Date,
    }),
    __metadata("design:type", Date)
], FeedBack.prototype, "endDate", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], FeedBack.prototype, "createdBy", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], FeedBack.prototype, "updatedBy", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['active', 'disabled'],
        default: 'active',
    }),
    __metadata("design:type", String)
], FeedBack.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({
        type: [mongoose_2.default.Schema.Types.Mixed],
    }),
    __metadata("design:type", Array)
], FeedBack.prototype, "questions", void 0);
__decorate([
    mongoose_1.Prop({
        type: [mongoose_2.default.Schema.Types.Mixed],
    }),
    __metadata("design:type", Array)
], FeedBack.prototype, "answers", void 0);
FeedBack = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        versionKey: false,
        collection: 'feedback',
    })
], FeedBack);
exports.FeedBack = FeedBack;
exports.FeedBackSchema = mongoose_1.SchemaFactory.createForClass(FeedBack);
//# sourceMappingURL=feedback.schema.js.map