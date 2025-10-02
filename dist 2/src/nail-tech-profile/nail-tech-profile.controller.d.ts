import { CreateNailTechProfileDto } from './dto/create-nail-tech-profile.dto';
import { NailTechProfileService } from './nail-tech-profile.service';
import { NailTechProfile } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NailTechProfileController {
    private readonly nailTechProfileService;
    private prismaService;
    constructor(nailTechProfileService: NailTechProfileService, prismaService: PrismaService);
    createNailTechProfile(createNailTechProfileDto: CreateNailTechProfileDto): Promise<NailTechProfile>;
    getTechProfiles(page?: number, limit?: number, sortYearOfExp?: 'asc' | 'desc', yearOfExp?: number): Promise<{
        data: NailTechProfile[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getTechById(id: string): Promise<NailTechProfile>;
}
