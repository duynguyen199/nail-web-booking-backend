import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    //   TypeOrmModule.forRoot({
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: 'postgres',
    //     database: 'postgres',
    //     autoLoadEntities: true,
    //     synchronize: true, // Enable in development to auto-create tables
    //   }),
    //   AuthModule,
    // ],
    PrismaModule,
    AuthModule
  ],
})
export class AppModule {}
