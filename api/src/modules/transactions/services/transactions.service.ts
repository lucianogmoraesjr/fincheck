import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionType } from '../entities/transaction.entity';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepository.create({
      userId,
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    });
  }

  findAllByUserId(
    userId: string,
    {
      month,
      year,
      bankAccountId,
      type,
    }: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepository.findAllByUserId(userId, {
      month,
      year,
      bankAccountId,
      type,
    });
  }

  async update({
    transactionId,
    updateTransactionDto,
    userId,
  }: {
    transactionId: string;
    userId: string;
    updateTransactionDto: UpdateTransactionDto;
  }) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      bankAccountId,
      categoryId,
      transactionId,
      userId,
    });

    return this.transactionsRepository.update(transactionId, {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionsRepository.delete(userId, transactionId);
  }

  private async validateEntitiesOwnership({
    bankAccountId,
    categoryId,
    userId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.execute(userId, transactionId),
      bankAccountId &&
        this.validateBankAccountOwnershipService.execute(userId, bankAccountId),
      categoryId &&
        this.validateCategoryOwnershipService.execute(userId, categoryId),
    ]);
  }
}
