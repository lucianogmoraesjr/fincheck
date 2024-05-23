import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(userId: string, categoryId: string) {
    const isOwner = await this.categoriesRepository.findByIdAndUserId(
      categoryId,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException();
    }
  }
}
