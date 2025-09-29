import { Module } from '@nestjs/common';
import { NailTechProfileController } from './nail-tech-profile.controller';
import { NailTechProfileService } from './nail-tech-profile.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports:[PrismaModule, JwtModule.register({
    secret:process.env.JWT_SECRET || "your_jwt_secret",
    signOptions:{expiresIn:"1h"}
  })],
  controllers: [NailTechProfileController],
  providers: [NailTechProfileService, RolesGuard]
})
export class NailTechProfileModule {}
