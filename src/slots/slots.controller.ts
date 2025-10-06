import { Controller, Get, Query, SetMetadata } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SlotsService } from './slots.service';

@ApiTags("Slots")
@Controller('slots')
export class SlotsController {

    constructor(private readonly slotService:SlotsService){}
    @Get()
    @SetMetadata("isPublic",true)
    @ApiQuery({name:"techId",required:true})
    @ApiQuery({name:"serviceId", required:true})
    @ApiQuery({name:"date", required:true,description:"Format: YYYY-MM-DD"})
    @ApiOkResponse({description:'List of available time slots for a tech and service'})
    async getSlots(
        @Query("techId")techId:string,
        @Query("serviceId")serviceId:string,
        @Query('date') date: string,
    ){
        return this.slotService.getAvailableSlots(techId,serviceId,date)
    }
}
