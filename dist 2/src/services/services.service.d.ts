import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from 'generated/prisma';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createService(serviceData: CreateServiceDto): Promise<Service>;
    getListService(page?: number, limit?: number, sortPrice?: 'asc' | 'desc', price?: number): Promise<{
        data: Service[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    removeService(id: string): Promise<void>;
    updateService(id: string, serviceData: UpdateServiceDto): Promise<Service>;
}
