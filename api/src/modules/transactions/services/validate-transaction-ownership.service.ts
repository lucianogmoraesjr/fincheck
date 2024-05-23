import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepository.findByIdAndUserId(
      transactionId,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException();
    }
  }
}
