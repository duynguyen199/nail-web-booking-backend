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
exports.CreateAvailabilityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../generated/prisma/index.js");
class CreateAvailabilityDto {
    techId;
    startAt;
    endAt;
    status;
}
exports.CreateAvailabilityDto = CreateAvailabilityDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "The Nail Tech's profile ID (UUID).",
        example: '1b2c3d4e-5678-90ab-cdef-1234567890ab',
    }),
    __metadata("design:type", String)
], CreateAvailabilityDto.prototype, "techId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Start time of the availability slot (ISO 8601 date string).',
        example: '2025-10-05T09:00:00.000Z',
    }),
    __metadata("design:type", String)
], CreateAvailabilityDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End time of the availability slot (ISO 8601 date string).',
        example: '2025-10-05T17:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAvailabilityDto.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the availability slot.',
        enum: prisma_1.AvailabilityStatus,
        example: 'AVAILABLE',
    }),
    (0, class_validator_1.IsEnum)(prisma_1.AvailabilityStatus),
    __metadata("design:type", String)
], CreateAvailabilityDto.prototype, "status", void 0);
//# sourceMappingURL=create-availability.dto.js.map