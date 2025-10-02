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
exports.AuthCredentialDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_type_1 = require("../usertype/user.type");
class AuthCredentialDTO {
    username;
    password;
    email;
    phoneNumber;
    role;
    avatarUrl;
}
exports.AuthCredentialDTO = AuthCredentialDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Username for login',
        example: 'duy_nguyen',
        minLength: 4,
        maxLength: 20,
        required: true,
    }),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], AuthCredentialDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Password must be 8-20 characters long, include uppercase, lowercase, number/special character',
        example: 'StrongP@ssw0rd',
        minLength: 8,
        maxLength: 20,
        required: true,
    }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak',
    }),
    __metadata("design:type", String)
], AuthCredentialDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'abc@gmail.com',
    }),
    __metadata("design:type", String)
], AuthCredentialDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\+?[1-9]\d{1,14}$/, {
        message: 'phoneNumber must be a valid international number',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The international phone number of the user (e.g., +12025550123)',
        example: '+12025550123',
        required: true,
    }),
    __metadata("design:type", String)
], AuthCredentialDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_type_1.UserRole, {
        message: 'role must be CLIENT, NAIL_TECH, or ADMIN',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'The role of the user',
        enum: user_type_1.UserRole,
        example: 'CLIENT',
        required: false,
    }),
    __metadata("design:type", String)
], AuthCredentialDTO.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'avatarUrl must be a valid URL' }),
    (0, swagger_1.ApiProperty)({
        description: "The URL of the user's avatar image",
        example: 'https://example.com/avatar.jpg',
        required: true,
    }),
    __metadata("design:type", String)
], AuthCredentialDTO.prototype, "avatarUrl", void 0);
//# sourceMappingURL=auth-credentials.dto.js.map