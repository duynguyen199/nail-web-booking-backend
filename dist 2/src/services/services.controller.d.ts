import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from 'generated/prisma';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): Promise<Service>;
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
