import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepository.findByIdAndUserId(
      bankAccountId,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException();
    }
  }
}
