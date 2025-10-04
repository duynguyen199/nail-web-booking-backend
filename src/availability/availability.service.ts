import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Availability, AvailabilityStatus } from '@prisma/client';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

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
  async findAllStatus() {
    
    return this.prismaService.availability.findMany({
      include:{
        nailTechProfile:{
          include:{user:true} // include tech + user info if needed
        }
      },
      orderBy:{startAt:"asc"}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} availability`;
  }

  async updateStatus(id: string, status: AvailabilityStatus):Promise<Availability> {
    const availability = await this.prismaService.availability.findUnique({where:{id}})
    if(!availability){
      throw new NotFoundException(404,"Availability Not found")
    }

    return this.prismaService.availability.update({
      where:{id},
      data:{status}
    })
  }

  remove(id: number) {
    return `This action removes a #${id} availability`;
  }
}
