import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(
    userId: string,
    { color, initialBalance, name, type }: CreateBankAccountDto,
  ) {
    return this.bankAccountsRepository.create({
      userId,
      name,
      initialBalance,
      color,
      type,
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts =
      await this.bankAccountsRepository.findAllByUserId(userId);

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, { type, value }) => acc + (type === 'INCOME' ? value : -value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.execute(
      userId,
      bankAccountId,
    );

    const updatedBankAccount = await this.bankAccountsRepository.update(
      bankAccountId,
      updateBankAccountDto,
    );

    return updatedBankAccount;
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.execute(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepository.delete(userId, bankAccountId);
  }
}
