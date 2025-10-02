import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNailTechProfileDto } from './dto/create-nail-tech-profile.dto';
import { NailTechProfile } from 'generated/prisma';
export declare class NailTechProfileService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createNailTechProfile(userId: string, createNailTechProfileDto: CreateNailTechProfileDto): Promise<NailTechProfile>;
    getAllTech(page?: number, limit?: number, sortYearOfExp?: 'asc' | 'desc', yearOfExp?: number): Promise<{
        data: NailTechProfile[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getTechById(id: string): Promise<NailTechProfile>;
}
