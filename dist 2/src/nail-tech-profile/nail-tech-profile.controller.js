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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NailTechProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const create_nail_tech_profile_dto_1 = require("./dto/create-nail-tech-profile.dto");
const nail_tech_profile_service_1 = require("./nail-tech-profile.service");
const prisma_service_1 = require("../prisma/prisma.service");
let NailTechProfileController = class NailTechProfileController {
    nailTechProfileService;
    prismaService;
    constructor(nailTechProfileService, prismaService) {
        this.nailTechProfileService = nailTechProfileService;
        this.prismaService = prismaService;
    }
    async createNailTechProfile(createNailTechProfileDto) {
        return this.nailTechProfileService.createNailTechProfile(createNailTechProfileDto.userId, createNailTechProfileDto);
    }
    async getTechProfiles(page = 1, limit = 10, sortYearOfExp = 'asc', yearOfExp) {
        return this.nailTechProfileService.getAllTech(page, limit, sortYearOfExp, yearOfExp);
    }
    async getTechById(id) {
        try {
            const profile = await this.nailTechProfileService.getTechById(id);
            return profile;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Nail tech profile with ID ${id} not found`);
        }
    }
};
exports.NailTechProfileController = NailTechProfileController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('NAIL_TECH ,ADMIN'),
    (0, swagger_1.ApiOkResponse)({ description: 'Service created successfully.' }),
    (0, swagger_1.ApiBody)({ type: create_nail_tech_profile_dto_1.CreateNailTechProfileDto }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nail_tech_profile_dto_1.CreateNailTechProfileDto]),
    __metadata("design:returntype", Promise)
], NailTechProfileController.prototype, "createNailTechProfile", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.SetMetadata)('isPublic', true),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of technician',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/NailTechProfile' },
                },
                total: { type: 'number' },
                page: { type: 'number' },
                limit: { type: 'number' },
                totalPages: { type: 'number' },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number for pagination',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page',
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortYearOfExp',
        required: false,
        type: String,
        description: 'Sort by year of experience (asc or desc',
        example: 'asc',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'yearOfExp',
        required: false,
        type: Number,
        example: 5,
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('sortYearOfExp')),
    __param(3, (0, common_1.Query)('yearOfExp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number]),
    __metadata("design:returntype", Promise)
], NailTechProfileController.prototype, "getTechProfiles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.SetMetadata)('isPublic', true),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns the nail tech profile',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'The unique identifier of the nail tech profile',
        example: '12345',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Nail tech profile not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NailTechProfileController.prototype, "getTechById", null);
exports.NailTechProfileController = NailTechProfileController = __decorate([
    (0, common_1.Controller)('nail-tech-profile'),
    (0, swagger_1.ApiTags)('nail-tech-profile'),
    __metadata("design:paramtypes", [nail_tech_profile_service_1.NailTechProfileService,
        prisma_service_1.PrismaService])
], NailTechProfileController);
//# sourceMappingURL=nail-tech-profile.controller.js.map