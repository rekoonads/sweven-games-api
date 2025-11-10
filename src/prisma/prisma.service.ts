import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    await this.$queryRaw`SELECT 1`;
    console.log('✅ Database connected and verified');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}