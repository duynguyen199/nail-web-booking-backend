import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { Availability } from 'generated/prisma';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    createAvailability(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAvailabilityDto: UpdateAvailabilityDto): string;
    remove(id: string): string;
}
