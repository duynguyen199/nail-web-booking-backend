import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Availability } from 'generated/prisma';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(' NAIL_TECH, ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Availability successfully created' })
  @ApiBody({ type: CreateAvailabilityDto })
  async createAvailability(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<Availability> {
    if (
      new Date(createAvailabilityDto.startAt) <=
      new Date(createAvailabilityDto.endAt)
    ) {
      throw new BadRequestException(400, 'Start must greater than end');
    }
    const checkOverlap = await this.availabilityService.checkOverlap(
      createAvailabilityDto,
    );
    if (checkOverlap) {
      throw new ConflictException(409, 'Overlap!!');
    }

    return this.availabilityService.create(createAvailabilityDto);
  }

  @Get()
  findAll() {
    return this.availabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availabilityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ) {
    return this.availabilityService.update(+id, updateAvailabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilityService.remove(+id);
  }
}
