"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementModule = void 0;
const common_1 = require("@nestjs/common");
const announcement_service_1 = require("./announcement.service");
const announcement_controller_1 = require("./announcement.controller");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_providers_1 = require("../../mongoose.providers");
const constants_1 = require("../../constants");
let AnnouncementModule = class AnnouncementModule {
};
AnnouncementModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature(mongoose_providers_1.models, constants_1.DB_CONNECTION_NAME)],
        providers: [announcement_service_1.AnnouncementService],
        controllers: [announcement_controller_1.AnnouncementController],
        exports: [announcement_service_1.AnnouncementService],
    })
], AnnouncementModule);
exports.AnnouncementModule = AnnouncementModule;
//# sourceMappingURL=announcement.module.js.map