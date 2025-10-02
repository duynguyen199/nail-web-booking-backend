import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '/Users/duynguyen/Desktop/nail app backend/naill-booking/generated/prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
