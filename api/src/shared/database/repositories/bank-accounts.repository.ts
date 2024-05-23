import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByUserId(userId: string) {
    return this.prismaService.bankAccount.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });
  }

  async findByIdAndUserId(id: string, userId: string) {
    return this.prismaService.bankAccount.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async create(createDto: Prisma.BankAccountUncheckedCreateInput) {
    return this.prismaService.bankAccount.create({
      data: createDto,
    });
  }

  async update(id: string, updateDto: Prisma.BankAccountUpdateInput) {
    return this.prismaService.bankAccount.update({
      data: updateDto,
      where: {
        id,
      },
    });
  }

  async delete(userId: string, bankAccountId: string) {
    return this.prismaService.bankAccount.delete({
      where: {
        id: bankAccountId,
        userId,
      },
    });
  }
}
