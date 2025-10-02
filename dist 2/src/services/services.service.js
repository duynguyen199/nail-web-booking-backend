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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServicesService = class ServicesService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createService(serviceData) {
        return this.prismaService.service.create({
            data: {
                name: serviceData.name,
                description: serviceData.description,
                durationMinutes: serviceData.durationMinutes,
                price: serviceData.price,
                isActive: serviceData.isActive,
            },
        });
    }
    async getListService(page = 1, limit = 10, sortPrice = 'asc', price) {
        const skip = (page - 1) * limit;
        const where = price ? { price: { lte: price } } : {};
        const [data, total] = await Promise.all([
            this.prismaService.service.findMany({
                where,
                skip,
                take: limit,
                orderBy: { price: sortPrice },
            }),
            this.prismaService.service.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return { data, total, page, limit, totalPages };
    }
    async removeService(id) {
        await this.prismaService.service.delete({
            where: { id },
        });
    }
    async updateService(id, serviceData) {
        return this.prismaService.service.update({
            where: { id },
            data: serviceData,
        });
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map