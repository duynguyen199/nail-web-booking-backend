import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Availability } from '../types/prisma';
@Injectable()
export class AvailabilityService {
  constructor(private prismaService: PrismaService) {}
  async create(createAvailabilityDto: CreateAvailabilityDto):Promise<Availability> {
    const tech = await this.prismaService.nailTechProfile.findUnique({
      where: { id: createAvailabilityDto.techId },
      include:{user:true}
    });
    if(!tech){
      throw new NotFoundException(404,"Tech ID not found")
    }
    if(tech.user.role !== "NAIL_TECH" ){
      throw new ForbiddenException(403,'Only nail techs can create availability');
    }
    
    return this.prismaService.availability.create({
      data:{
        techId:createAvailabilityDto.techId,
        startAt: new Date(createAvailabilityDto.startAt),
        endAt: new Date(createAvailabilityDto.endAt),
        status: createAvailabilityDto.status,
      }
    })
  }

  async checkOverlap(dto: CreateAvailabilityDto): Promise<Availability | null> {
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

  findOne(id: number) {
    return `This action returns a #${id} availability`;
  }

  update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
    return `This action updates a #${id} availability`;
  }

  remove(id: number) {
    return `This action removes a #${id} availability`;
  }
}
