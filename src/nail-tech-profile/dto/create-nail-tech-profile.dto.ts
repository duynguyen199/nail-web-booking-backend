import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsObject, IsString } from "class-validator";

export class CreateNailTechProfileDto{
    // model NailTechProfile{
    //     id String @id @default(uuid())
    //     userId String @unique
    //     bio String?
    //     yearOfExp Int @default(0)
    //     ratingAgv Float @default(0.0)
    //     bufferMinutes Int @default(15)
    //     workingHours Json
    //     createdAt       DateTime @default(now())
    //     updatedAt       DateTime @updatedAt
    //     user User @relation(fields: [userId], references: [id], onDelete: Cascade)
    //     @@index([userId]) // Optional: Improves query performance on the foreign key
    //   }
    @IsString()
    @ApiProperty({
        description:"User Id of a nail tech FK",
        example: '550e8400-e29b-41d4-a716-446655440000',
        required:true
        })
    userId:string

    @IsString()
    @ApiProperty({
        description:"bio of a nail tech",
        example:"I am a manicurist can do acrylic",
        minLength: 10,
        maxLength:50,
        required:false
    })
    bio?:string

    @IsInt()
    @ApiProperty({
        description:"Year of Experience",
        example:5,
        required:true
    })
    yearOfExp: number

    @IsNumber()
    @ApiProperty({
        description:"Rating of nail tech",
        example:4.5,
        required:true
    })
    ratingAvg: number

    @IsInt()
    @ApiProperty({
        description:"Buffer time between appointments (minutes)",
        example:15,
        required:true
    })
    bufferMinutes:number

    @IsObject()
    @ApiProperty({
    description: 'Working hours in JSON format',
    example: { "monday": ["09:00-17:00"], "tuesday": ["10:00-18:00"] },
    required: true,
  })
  workingHours: Record<string, string[]>;

}