import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  public async add(dto: RoleDto): Promise<Role> {
    return await this.prisma.role.create({
      data: {
        code: dto.code,
        name: dto.name,
      },
    });
  }

  public async get(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  public async delete(id: number): Promise<Role> {
    if (!id) throw new BadRequestException('Идентификатор неверный');

    return await this.prisma.role.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
