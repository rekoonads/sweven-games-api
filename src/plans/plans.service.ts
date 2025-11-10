import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: createPlanDto,
    });
  }

  async findAll() {
    return this.prisma.plan.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.plan.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.plan.findFirst({
      where: { 
        name,
        isActive: true,
      },
    });
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.prisma.plan.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  async remove(id: string) {
    return this.prisma.plan.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}