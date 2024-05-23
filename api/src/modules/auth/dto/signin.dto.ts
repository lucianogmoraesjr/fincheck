import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export abstract class SigninDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
