import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ServicesModule implements NestModule {
    private readonly jwtService;
    private readonly prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    configure(consumer: MiddlewareConsumer): void;
}
