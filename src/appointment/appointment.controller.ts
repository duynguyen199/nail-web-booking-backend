import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from 'generated/prisma';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { DenyAppointmentDto } from './dto/deny-appointment-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('CLIENT', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: CreateAppointmentDto,
    examples: {
      valid: {
        summary: 'Valid request example',
        value: {
          clientId: 'bba083a7-3014-419a-b8ed-dec3033ca305',
          techId: 'd47c3ff5-c0f9-48ee-83ec-8830d7f7282f',
          serviceId: '1413fa94-b292-4b02-8ab0-4f03942f72a9',
          startAt: '2025-10-12T10:00:00.000Z',
          reason: 'Full manicure with nail art',
        },
      },
    },
  })
  async makeAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment =
      await this.appointmentService.makeAppoinment(createAppointmentDto);
    if (!appointment)
      throw new BadRequestException('Bad Request for appointment');
    return appointment;
  }

  // @Get()
  // @ApiBearerAuth('access-token')
  // @UseGuards(RolesGuard)
  // @Roles('CLIENT', 'NAIL_TECH', 'ADMIN')
  // @ApiOkResponse({ description: 'List all appointments' })
  // async findAll(): Promise<Appointment[]> {
  //   return this.appointmentService.getAllAppointment();
  // }

  @Patch(':id/confirm')
  @UseGuards(RolesGuard)
  @Roles('NAIL_TECH', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Confirm an appointment (Tech or Admin only)' })
  @ApiOkResponse({
    description: 'Appointment successfully confirmed',
    schema: {
      example: {
        id: '83e21ad3-2a71-42aa-a7f9-9d2e8db4a55b',
        clientId: 'bba083a7-3014-419a-b8ed-dec3033ca305',
        techId: 'd47c3ff5-c0f9-48ee-83ec-8830d7f7282f',
        serviceId: '1413fa94-b292-4b02-8ab0-4f03942f72a9',
        startAt: '2025-10-12T10:00:00.000Z',
        endAt: '2025-10-12T11:00:00.000Z',
        status: 'CONFIRMED',
        reason: 'Client confirmed and ready for service',
        createdAt: '2025-10-06T19:45:00.000Z',
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment ID to confirm',
    example: '83e21ad3-2a71-42aa-a7f9-9d2e8db4a55b',
  })
  async confirmAppointment(@Param('id') id: string) {
    return this.appointmentService.confirmAppointment(id);
  }

  @Patch(':id/deny')
  @UseGuards(RolesGuard)
  @Roles('NAIL_TECH', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Deny an appointment (Tech or Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'Appointment ID to deny',
    example: '83e21ad3-2a71-42aa-a7f9-9d2e8db4a55b',
  })
  @ApiBody({
    type: DenyAppointmentDto,
    examples: {
      example: {
        summary: 'Deny appointment with reason',
        value: {
          reason: 'Overlapping appointment with another client',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Appointment successfully denied',
    schema: {
      example: {
        id: '83e21ad3-2a71-42aa-a7f9-9d2e8db4a55b',
        status: 'DENIED',
        reason: 'Overlapping appointment with another client',
      },
    },
  })
  async denyAppointment(
    @Param('id') id: string,
    @Body() body: DenyAppointmentDto,
  ) {
    return this.appointmentService.denyAppointment(id, body.reason);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles("CLIENT","NAIL_TECH","ADMIN")
  @ApiBearerAuth("access-token")
  @ApiQuery({
    name:"status",required:false
  })
  @ApiQuery({
    name:"from", required:false
  })
  @ApiQuery({ name: 'to', required: false })
  async getAppointments(
    @Req()req:Request,
    @Query("status")status?:string,
    @Query("from")from?:string,
    @Query("to")to?:string,
  ):Promise<Appointment[]>{
    const user = (req as any).user;
    const role = user.role
    const userId = user.id
    return this.appointmentService.getAppointments(role,userId,status,from,to)
  }
  // appointment.controller.ts
@Post(':id/checkin')
@UseGuards(RolesGuard)
@Roles('CLIENT', 'ADMIN')
@ApiBearerAuth('access-token')
@ApiOperation({ summary: 'Client checks in for appointment (within 30min grace window)' })
async checkIn(@Param('id') id: string) {
  return this.appointmentService.checkInAppointment(id);
}

 
}
