import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, // Provides PrismaService
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }), // Provides JwtService
  ],
  controllers: [ServicesController],
  providers: [ServicesService, RolesGuard],
})
export class ServicesModule implements NestModule {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    // No middleware needed; guard handles authorization
  }
}
