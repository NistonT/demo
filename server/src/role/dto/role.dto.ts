import { IsString } from 'class-validator';

export class RoleDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}
