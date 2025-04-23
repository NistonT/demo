import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { RegisterUser } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RegisterUser): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
        number: dto.number,
        login: dto.login,
      },
    });
  }

  async getByAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: {
        login,
      },
    });
  }
}
