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
exports.StationTransformPipe = void 0;
const common_1 = require("@nestjs/common");
const station_service_1 = require("../station.service");
let StationTransformPipe = class StationTransformPipe {
    async transform(body) {
        const { objectId } = body;
        const station = await this.stationService.findByObjectIdStatus(objectId);
        if (!station) {
            throw new common_1.BadRequestException({
                message: 'not found station.',
            });
        }
        return station;
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", station_service_1.StationService)
], StationTransformPipe.prototype, "stationService", void 0);
StationTransformPipe = __decorate([
    common_1.Injectable()
], StationTransformPipe);
exports.StationTransformPipe = StationTransformPipe;
//# sourceMappingURL=station-transform.pipe.js.map