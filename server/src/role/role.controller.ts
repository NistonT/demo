import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  public async add(@Body() dto: RoleDto): Promise<Role> {
    return await this.roleService.add(dto);
  }

  @Get()
  public async get(): Promise<Role[]> {
    return await this.roleService.get();
  }

  @Delete()
  public async delete(@Query('id') id: number): Promise<Role> {
    return await this.roleService.delete(id);
  }
}
