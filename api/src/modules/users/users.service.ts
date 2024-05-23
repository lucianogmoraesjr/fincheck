import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string) {
    const user = await this.usersRepository.findById(id);

    return {
      name: user.name,
      email: user.email,
    };
  }
}
