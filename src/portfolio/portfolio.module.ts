import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/roles.guard';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports:[PrismaModule,S3Module,JwtModule.register({
    secret:process.env.JWT_SECRET || "your_jwt_secret",
    signOptions:{expiresIn:"1h"}
  })],
  controllers: [PortfolioController],
  providers: [PortfolioService, RolesGuard]
})
export class PortfolioModule {}
