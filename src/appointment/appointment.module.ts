import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports:[PrismaModule,JwtModule.register({
    secret:process.env.JWT_SECRET || "your_jwt_secret",
    signOptions:{expiresIn:"1h"}
  })],
  controllers: [AppointmentController],
  providers: [AppointmentService,RolesGuard]
})
export class AppointmentModule {}
