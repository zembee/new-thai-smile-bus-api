"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteSchema = exports.Route = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const nanoid_1 = require("nanoid");
const mongoose = __importStar(require("mongoose"));
class Stations {
}
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
        index: true,
    }),
    __metadata("design:type", String)
], Stations.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['go', 'return'],
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], Stations.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
        default: 0,
        index: true,
    }),
    __metadata("design:type", Number)
], Stations.prototype, "index", void 0);
let Route = class Route {
};
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        unique: true,
        default: nanoid_1.nanoid,
    }),
    __metadata("design:type", String)
], Route.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
        unique: true,
    }),
    __metadata("design:type", String)
], Route.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], Route.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({
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
    }),
    __metadata("design:type", Array)
], Route.prototype, "stations", void 0);
__decorate([
    mongoose_1.Prop({
        index: true,
        default: null,
        type: mongoose.Schema.Types.Mixed,
    }),
    __metadata("design:type", mongoose.Schema.Types.Mixed)
], Route.prototype, "history", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: ['active', 'disabled'],
        default: 'active',
        index: true,
    }),
    __metadata("design:type", String)
], Route.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Route.prototype, "createdBy", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Route.prototype, "updatedBy", void 0);
Route = __decorate([
    mongoose_1.Schema({
        timestamps: true,
        versionKey: false,
        collection: 'route',
    })
], Route);
exports.Route = Route;
exports.RouteSchema = mongoose_1.SchemaFactory.createForClass(Route);
//# sourceMappingURL=route.schema.js.map