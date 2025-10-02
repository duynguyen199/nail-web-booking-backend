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
exports.CreateNailTechProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateNailTechProfileDto {
    userId;
    bio;
    yearOfExp;
    ratingAvg;
    bufferMinutes;
    workingHours;
}
exports.CreateNailTechProfileDto = CreateNailTechProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "User Id of a nail tech FK",
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: true
    }),
    __metadata("design:type", String)
], CreateNailTechProfileDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "bio of a nail tech",
        example: "I am a manicurist can do acrylic",
        minLength: 10,
        maxLength: 50,
        required: false
    }),
    __metadata("design:type", String)
], CreateNailTechProfileDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: "Year of Experience",
        example: 5,
        required: true
    }),
    __metadata("design:type", Number)
], CreateNailTechProfileDto.prototype, "yearOfExp", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: "Rating of nail tech",
        example: 4.5,
        required: true
    }),
    __metadata("design:type", Number)
], CreateNailTechProfileDto.prototype, "ratingAvg", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: "Buffer time between appointments (minutes)",
        example: 15,
        required: true
    }),
    __metadata("design:type", Number)
], CreateNailTechProfileDto.prototype, "bufferMinutes", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiProperty)({
        description: 'Working hours in JSON format',
        example: { "monday": ["09:00-17:00"], "tuesday": ["10:00-18:00"] },
        required: true,
    }),
    __metadata("design:type", Object)
], CreateNailTechProfileDto.prototype, "workingHours", void 0);
//# sourceMappingURL=create-nail-tech-profile.dto.js.map