import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DenyAppointmentDto{

    @ApiProperty({
        description:"Reason for nail tech can deny appointmnet",
        example:"Tech is unavailable at this time "
    })
    @IsNotEmpty()
    @IsString()
    reason:string
}