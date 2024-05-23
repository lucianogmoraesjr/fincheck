import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TransactionType } from 'src/modules/transactions/entities/transaction.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.prismaService.transaction.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
      include: {
        category: {
          select: {
            icon: true,
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findByIdAndUserId(id: string, userId: string) {
    return this.prismaService.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(createDto: Prisma.TransactionUncheckedCreateInput) {
    return this.prismaService.transaction.create({
      data: createDto,
    });
  }

  async update(id: string, updateDto: Prisma.TransactionUncheckedUpdateInput) {
    return this.prismaService.transaction.update({
      data: updateDto,
      where: {
        id,
      },
    });
  }

  async delete(userId: string, transactionId: string) {
    return this.prismaService.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });
  }
}
