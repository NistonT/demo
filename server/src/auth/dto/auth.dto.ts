import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AdminDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
