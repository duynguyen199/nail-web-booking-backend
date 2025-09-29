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
    email: string,
    createNailTechProfile: CreateNailTechProfileDto,
  ): Promise<NailTechProfile> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with ${email} not found`);
    }
    if (user.role !== 'NAIL_TECH') {
      throw new ConflictException(
        `User with email ${email} is not a NAIL_TECH`,
      );
    }

    const existingProfile = await this.prismaService.nailTechProfile.findUnique(
      {
        where: { userId: user.id },
      },
    );

    if (existingProfile) {
      throw new ConflictException(
        `Nail tech profile for user ${email} already exists`,
      );
    }
    const { bio, yearOfExp, ratingAvg, bufferMinutes, workingHours } =
      createNailTechProfile;

    return this.prismaService.nailTechProfile.create({
      data: {
        userId: user.id,
        bio,
        yearOfExp,
        ratingAvg,
        bufferMinutes,
        workingHours,
      },
    });
  }
}
