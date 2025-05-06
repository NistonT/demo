import { IsEmail, IsString } from 'class-validator';

export class EmailAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginAuthDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class AdminDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
