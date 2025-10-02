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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AvailabilityService = class AvailabilityService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createAvailabilityDto) {
        const tech = await this.prismaService.nailTechProfile.findUnique({
            where: { id: createAvailabilityDto.techId },
            include: { user: true }
        });
        if (!tech) {
            throw new common_1.NotFoundException(404, "Tech ID not found");
        }
        if (tech.user.role !== "NAIL_TECH") {
            throw new common_1.ForbiddenException(403, 'Only nail techs can create availability');
        }
        return this.prismaService.availability.create({
            data: {
                techId: createAvailabilityDto.techId,
                startAt: new Date(createAvailabilityDto.startAt),
                endAt: new Date(createAvailabilityDto.endAt),
                status: createAvailabilityDto.status,
            }
        });
    }
    async checkOverlap(dto) {
        return this.prismaService.availability.findFirst({
            where: {
                techId: dto.techId,
                startAt: { lt: new Date(dto.endAt) },
                endAt: { gt: new Date(dto.startAt) },
            },
        });
    }
    findAll() {
        return `This action returns all availability`;
    }
    findOne(id) {
        return `This action returns a #${id} availability`;
    }
    update(id, updateAvailabilityDto) {
        return `This action updates a #${id} availability`;
    }
    remove(id) {
        return `This action removes a #${id} availability`;
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map