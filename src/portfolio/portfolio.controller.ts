import { Roles } from 'src/auth/roles.decorator';
import { PortfolioService } from './portfolio.service';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('portfolio')
export class PortfolioController {
  constructor(private portService: PortfolioService) {}

  @Post(':id/portfolio')
  @UseGuards(RolesGuard)
  @Roles('NAIL_TECH', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload image to portfolio' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPortfolio(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.portService.uploadPortfolio(file, id);
  }

  @Get(':id/portfolio')
  @ApiOperation({ summary: 'Get all portfolio images of a nail tech' })
  async getPortfolio(@Param('id') id: string) {
    return this.portService.getPortfolioByTechId(id);
  }
}
