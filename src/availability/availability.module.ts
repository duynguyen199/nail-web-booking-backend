import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/roles.guard';
import { AvailabilityController } from './availability.controller';

@Module({
  imports:[PrismaModule,JwtModule.register({
    secret:process.env.JWT_SECRET || "your_jwt_secret",
    signOptions:{expiresIn:"1h"}
  })],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, RolesGuard],
})
export class AvailabilityModule {}
