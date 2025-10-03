import { OnModuleInit, OnModuleDestroy, Injectable } from '@nestjs/common';

// Import PrismaClient from the generated client
const { PrismaClient } = require('../../../prisma/generated/prisma');

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.log('Prisma Client initialized at', new Date().toISOString());
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
