import { IsOptional, IsString } from 'class-validator';

export class RegisterUser {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  login?: string;

  @IsString()
  email: string;
}
