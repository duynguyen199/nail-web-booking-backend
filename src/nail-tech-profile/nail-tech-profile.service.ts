import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNailTechProfileDto } from './dto/create-nail-tech-profile.dto';
import { NailTechProfile } from 'generated/prisma';

@Injectable()
export class NailTechProfileService {
  constructor(private prismaService: PrismaService) {}

  async createNailTechProfile(
    userId: string, // Change parameter to userId
    createNailTechProfileDto: CreateNailTechProfileDto,
  ): Promise<NailTechProfile> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId }, // Use userId instead of email
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (user.role !== 'NAIL_TECH') {
      throw new ConflictException(`User with ID ${userId} is not a NAIL_TECH`);
    }
    const existingProfile = await this.prismaService.nailTechProfile.findUnique(
      {
        where: { userId },
      },
    );
    if (existingProfile) {
      throw new ConflictException(
        `Nail tech profile for user ${userId} already exists`,
      );
    }
    const { bio, yearOfExp, ratingAvg, bufferMinutes, workingHours } =
      createNailTechProfileDto;
    return this.prismaService.nailTechProfile.create({
      data: {
        userId,
        bio,
        yearOfExp,
        ratingAvg,
        bufferMinutes,
        workingHours,
      },
    });
  }
  async getAllTech(
    page: number = 1,
    limit: number = 10,
    sortYearOfExp: 'asc' | 'desc' = 'asc',
    yearOfExp?: number,
  ): Promise<{
    data: NailTechProfile[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const where = yearOfExp ? { yearOfExp: { lte: yearOfExp } } : {};
    const [data, total] = await Promise.all([
      this.prismaService.nailTechProfile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { yearOfExp: sortYearOfExp },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              phoneNumber: true,
              role: true,
              avatarUrl: true,
              createdAt: true,
              // ❌ no password
            },
          },
        },
      }),
      this.prismaService.nailTechProfile.count({ where }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return { data, total, page, limit, totalPages };
  }
  async getTechById(id: string): Promise<NailTechProfile> {
    const profile = await this.prismaService.nailTechProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            phoneNumber: true,
            role: true,
            avatarUrl: true,
            createdAt: true,
            // ❌ no password
          },
        },
      },
    })
    if (!profile) {
      throw new NotFoundException(404, 'profile not found');
    }
    return profile;
  }
}
