import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  async findAll() {
    return this.prisma.game.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.game.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.game.findUnique({
      where: { name },
    });
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    return this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });
  }

  async remove(id: string) {
    return this.prisma.game.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}