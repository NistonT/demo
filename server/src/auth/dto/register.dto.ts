import { IsString } from 'class-validator';

export class RegisterAuth {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  number: string;

  @IsString()
  email: string;

  @IsString()
  login: string;
}
