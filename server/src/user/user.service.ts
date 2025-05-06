import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { RegisterUser } from './dto/register.dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async create(dto: RegisterUser): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
        number: dto.number,
        login: dto.login,
        roleId: 1,
      },
    });
  }

  public async update(dto: UpdateUserDto, id: number): Promise<User> {
    const user = await this.getById(id);

    if (!user) throw new BadRequestException('Пользователь не найден');

    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: dto.name,
        login: dto.login,
        email: dto.email,
        number: dto.number,
        roleId: dto.roleId,
      },
    });
  }

  public async getByAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  public async getById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async getByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: {
        login,
      },
    });
  }
}
