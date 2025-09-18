import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: false, // Set to true only in development, not production
    }),
    TypeOrmModule.forFeature([UserRepository]), // Register custom repositories
  ],
  providers: [UserRepository],
})
export class AppModule {}
