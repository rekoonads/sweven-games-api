import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({
      data: createSubscriptionDto,
    });
  }

  async findAll() {
    return this.prisma.subscription.findMany({
      include: {
        user: true,
        plan: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.subscription.findUnique({
      where: { id },
      include: {
        user: true,
        plan: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
      include: {
        user: true,
        plan: true,
      },
    });
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.subscription.delete({
      where: { id },
    });
  }
}