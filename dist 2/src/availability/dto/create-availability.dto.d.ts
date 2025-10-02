import { AvailabilityStatus } from "generated/prisma";
export declare class CreateAvailabilityDto {
    techId: string;
    startAt: string;
    endAt: string;
    status: AvailabilityStatus;
}
