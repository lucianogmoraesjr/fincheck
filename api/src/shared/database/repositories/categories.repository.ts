import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByUserId(id: string) {
    return this.prismaService.category.findMany({
      where: {
        userId: id,
      },
    });
  }

  async findByIdAndUserId(id: string, userId: string) {
    return this.prismaService.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
}
