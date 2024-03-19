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
exports.SocialAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SocialAuthDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'jwt of authentication',
        required: true,
        example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjM2Y0ZThiMmYxZDAyZjBlYTRiMWJkZGU1NWFkZDhiMDhiYzUzODYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmx1Yml0ZXgtdHJhZGUiLCJhdWQiOiJibHViaXRleC10cmFkZSIsImF1dGhfdGltZSI6MTYyMDc0NTM3NiwidXNlcl9pZCI6ImNCVVY4RGZUT1VmU0d2b1k3YnJwOXNjVVlSeDEiLCJzdWIiOiJjQlVWOERmVE9VZlNHdm9ZN2JycDlzY1VZUngxIiwiaWF0IjoxNjIwNzQ1Mzc2LCJleHAiOjE2MjA3NDg5NzYsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiYXBwbGUuY29tIjpbIjAwMTA0Ni4xZGFkYmFjYmU4MmE0YTRjYTM0MGM5ZDIwN2MzNGQwYi4xMDU5Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiYXBwbGUuY29tIn19.SET8c187n1dXFlaQY01gUAjq2ZETxGmTy2zamCkKJhL-N8eV7crwAD_D0p-REbp65nY8np91rjUjaBV78zAsTYxAFvfYs35xtmOe2Z93bgkat1oEk158_NKRj9WKxoRjaDIIaD5__T8EB97TAf5H3Hv1c_qle073zLS8r1gzVWBClJIK6VgVIniyyOC-R3ujy0U6OTOuB04ANUyoDGlMHAxyh17DevxEaMrCBShWHiKsY3HChyD_Ed6bAO1JSXs7shNwNV0QrF2MX9LYHkoiu-PfbitT2MSTUUkbQfRpvJOPvDfvGAJD_U2ulskwUZjuTJm9p-sw5Xx_HEGbRGffAQ',
    }),
    __metadata("design:type", String)
], SocialAuthDto.prototype, "jwt", void 0);
exports.SocialAuthDto = SocialAuthDto;
//# sourceMappingURL=social-auth.dto.js.map