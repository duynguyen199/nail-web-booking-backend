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
  SetMetadata,
} from "@nestjs/common";
import { AvailabilityService } from "./availability.service";
import { CreateAvailabilityDto } from "./dto/create-availability.dto";
import { UpdateAvailabilityDto } from "./dto/update-availability.dto";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { Availability, AvailabilityStatus } from "@prisma/client";

@Controller("availability")
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles("NAIL_TECH", "ADMIN")
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ description: "Availability successfully created" })
  @ApiBody({ type: CreateAvailabilityDto })
  async createAvailability(
    @Body() createAvailabilityDto: CreateAvailabilityDto
  ): Promise<Availability> {
    if (
      new Date(createAvailabilityDto.startAt) >=
      new Date(createAvailabilityDto.endAt)
    ) {
      throw new BadRequestException(400, "Start must be before end");
    }

    const checkOverlap = await this.availabilityService.checkOverlap(
      createAvailabilityDto
    );
    if (checkOverlap) {
      throw new ConflictException(409, "Overlap!!");
    }

    return this.availabilityService.create(createAvailabilityDto);
  }

  @Get()
  @ApiBearerAuth("access-token") // if you want auth required
  @UseGuards(RolesGuard)
  @Roles("CLIENT", "NAIL_TECH", "ADMIN")
  @ApiOkResponse({
    description: "List of all availabilities",
    type: [Object], // you could map to DTO if you want more control
  })
  async findAll(): Promise<Availability[]> {
    return this.availabilityService.findAllStatus();
  }

  @Patch(":id/status")
  @UseGuards(RolesGuard)
  @Roles("ADMIN", "NAIL_TECH")
  @ApiBearerAuth("access-token")
  @ApiOkResponse({
    description: "Status successfully updated",
    type: Object,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["AVAILABLE", "BUSY", "LUNCH", "ON_HOLD"],
          example: "AVAILABLE",
        },
      },
    },
  })
  async updateStatus(
    @Param("id") id: string,
    @Body("status") status: AvailabilityStatus
  ): Promise<Availability> {
    return this.availabilityService.updateStatus(id, status);
  }
}
