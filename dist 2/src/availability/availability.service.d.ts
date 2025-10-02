import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Availability } from 'generated/prisma';
export declare class AvailabilityService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability>;
    checkOverlap(dto: CreateAvailabilityDto): Promise<Availability | null>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAvailabilityDto: UpdateAvailabilityDto): string;
    remove(id: number): string;
}
