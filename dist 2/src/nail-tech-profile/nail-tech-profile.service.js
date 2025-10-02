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
exports.NailTechProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NailTechProfileService = class NailTechProfileService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createNailTechProfile(userId, createNailTechProfileDto) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        if (user.role !== 'NAIL_TECH') {
            throw new common_1.ConflictException(`User with ID ${userId} is not a NAIL_TECH`);
        }
        const existingProfile = await this.prismaService.nailTechProfile.findUnique({
            where: { userId },
        });
        if (existingProfile) {
            throw new common_1.ConflictException(`Nail tech profile for user ${userId} already exists`);
        }
        const { bio, yearOfExp, ratingAvg, bufferMinutes, workingHours } = createNailTechProfileDto;
        return this.prismaService.nailTechProfile.create({
            data: {
                userId,
                bio,
                yearOfExp,
                ratingAvg,
                bufferMinutes,
                workingHours,
            },
        });
    }
    async getAllTech(page = 1, limit = 10, sortYearOfExp = 'asc', yearOfExp) {
        const skip = (page - 1) * limit;
        const where = yearOfExp ? { yearOfExp: { lte: yearOfExp } } : {};
        const [data, total] = await Promise.all([
            this.prismaService.nailTechProfile.findMany({
                where,
                skip,
                take: limit,
                orderBy: { yearOfExp: sortYearOfExp },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            phoneNumber: true,
                            role: true,
                            avatarUrl: true,
                            createdAt: true,
                        },
                    },
                },
            }),
            this.prismaService.nailTechProfile.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return { data, total, page, limit, totalPages };
    }
    async getTechById(id) {
        const profile = await this.prismaService.nailTechProfile.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        phoneNumber: true,
                        role: true,
                        avatarUrl: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!profile) {
            throw new common_1.NotFoundException(404, 'profile not found');
        }
        return profile;
    }
};
exports.NailTechProfileService = NailTechProfileService;
exports.NailTechProfileService = NailTechProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NailTechProfileService);
//# sourceMappingURL=nail-tech-profile.service.js.map