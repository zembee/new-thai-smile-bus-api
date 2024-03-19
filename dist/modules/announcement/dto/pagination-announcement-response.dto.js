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
const swagger_1 = require("@nestjs/swagger");
class PaginationAnnouncementResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationAnnouncementResponseDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 20,
    }),
    __metadata("design:type", Number)
], PaginationAnnouncementResponseDto.prototype, "perPage", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 100,
    }),
    __metadata("design:type", Number)
], PaginationAnnouncementResponseDto.prototype, "count", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [{
                '_id': '60e7c8d498192c9f7ad15db6',
                'image': 'tbs1-07.png',
                'title': 'ตอบโจทย์ยุค 4.0',
                'subtitle': 'สังคมไทย ไร้เงินสด ไม่ต้องวุ่นวายพกเหรียญให้หนักกระเป๋า THAI SMILE BUS มีเทคโนโลยีช่วยตอบโจทย์ เครื่องอ่านบัตรสำหรับการรองรับการชำระเงิน แบบอิเล็กทรอนิกส์บนรถบัสโดยสารทุกคัน',
                'objectId': 'DtncfIXBUhEYm20Qq2CER',
                'createdAt': new Date('2021-07-09T03:56:04.624Z'),
                'updatedAt': new Date('2021-07-09T03:56:04.624Z'),
            }],
    }),
    __metadata("design:type", Array)
], PaginationAnnouncementResponseDto.prototype, "records", void 0);
exports.default = PaginationAnnouncementResponseDto;
//# sourceMappingURL=pagination-announcement-response.dto.js.map