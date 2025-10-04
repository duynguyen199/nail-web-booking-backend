import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Service } from '../types/prisma';
import { UpdateServiceDto } from './dto/update-service.dto';
import { RolesGuard } from 'src/auth/roles.guard';
@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOkResponse({ description: 'Service created successfully.' })
  @ApiBody({ type: CreateServiceDto })
  @ApiBearerAuth('access-token')
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.createService(createServiceDto);
  }

  @Get()
  @SetMetadata('isPublic', true)
  @ApiOkResponse({
    description: 'List of services retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Service' },
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
    name: 'sortPrice',
    required: false,
    type: String,
    description: 'Sort by price (asc or desc)',
    example: 'asc',
  })
  @ApiQuery({
    name: 'price',
    required: false,
    type: Number,
    description: 'Filter by maximum price',
    example: 100,
  })
  // @ApiBearerAuth('access-token')
  async getListService(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortPrice') sortPrice: 'asc' | 'desc' = 'asc',
    @Query('price') price?: number,
  ) {
    return this.servicesService.getListService(page, limit, sortPrice, price);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  @ApiOkResponse({ description: 'Service removed successfully.' })
  @ApiBearerAuth('access-token')
  async removeService(id: string): Promise<void> {
    return this.servicesService.removeService(id);
  }
  @Patch(':id')
  @Roles('ADMIN')
  @ApiOkResponse({ description: 'Service updated successfully.' })
  @ApiBody({ type: UpdateServiceDto })
  @ApiBearerAuth('access-token')
  async updateService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() serviceData: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.updateService(id, serviceData);
  }
}
