import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from 'generated/prisma';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prismaService: PrismaService) {}

  async createService(serviceData: CreateServiceDto): Promise<Service> {
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
  async getListService(
    page: number = 1,
    limit: number = 10,
    sortPrice: 'asc' | 'desc' = 'asc',
    price?: number,
  ): Promise<{
    data: Service[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const where = price ? { price: { lte: price } } : {}; // filter by price if provided (lte for max price)
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

  async removeService(id: string): Promise<void> {
    await this.prismaService.service.delete({
      where: { id },
    });
  }
  async updateService(
    id: string,
    serviceData: UpdateServiceDto,
  ): Promise<Service> {
    return this.prismaService.service.update({
      where: { id },
      data: serviceData,
    });
  }
}
