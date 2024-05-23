import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin({ email, password }: SigninDto) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup({ email, name, password }: SignupDto) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new ConflictException('E-mail already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
