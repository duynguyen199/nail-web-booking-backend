import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateNailTechProfileDto } from './dto/create-nail-tech-profile.dto';
import { NailTechProfileService } from './nail-tech-profile.service';
import { NailTechProfile } from 'generated/prisma';
import { NailTechProfileModule } from './nail-tech-profile.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('nail-tech-profile')
@ApiTags('nail-tech-profile')
export class NailTechProfileController {
  constructor(
    private readonly nailTechProfileService: NailTechProfileService,
    private prismaService:PrismaService
  ) {}
  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles('NAIL_TECH')
  @ApiOkResponse({ description: 'Service created successfully.' })
  @ApiBody({ type: CreateNailTechProfileDto })
  @ApiBearerAuth('access-token')
  async createNailTechProfile(
    @Body() createNailTechProfileDto: CreateNailTechProfileDto,
  ): Promise<NailTechProfile> {
    return this.nailTechProfileService.createNailTechProfile(
      createNailTechProfileDto.userId, // Pass userId instead of email
      createNailTechProfileDto,
    );
  }

  @Get()
  @SetMetadata('isPublic', true)
  @ApiOkResponse({
    description: 'List of technician',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/NailTechProfile' }, // Updated to match Prisma type
        },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
        totalPages: { type: 'number' },
      },
    },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'sortYearOfExp',
    required: false,
    type: String,
    description: 'Sort by year of experience (asc or desc',
    example: 'asc',
  })
  @ApiQuery({
    name: 'yearOfExp',
    required: false,
    type: Number,
    example: 5,
  })
  async getTechProfiles(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortYearOfExp') sortYearOfExp: 'asc' | 'desc' = 'asc',
    @Query('yearOfExp') yearOfExp?: number,
  ) {
    return this.nailTechProfileService.getAllTech(
      page,
      limit,
      sortYearOfExp,
      yearOfExp,
    );
  }

  @Get(':id')
  @SetMetadata('isPublic', true)
  @ApiOkResponse({
    description: 'Returns the nail tech profile',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The unique identifier of the nail tech profile',
    example: '12345',
  })
  @ApiResponse({
    status: 404,
    description: 'Nail tech profile not found',
  })
  async getTechById(@Param('id') id: string): Promise<NailTechProfile> {
    try {
      const profile = await this.nailTechProfileService.getTechById(id);
      return profile;
    } catch (error) {
      throw new NotFoundException(`Nail tech profile with ID ${id} not found`);
    }
  }
}
