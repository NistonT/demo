import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Получение всех пользователей по url:
  // GET localhost:5555/api/user/users
  @Get('/users')
  @Auth()
  async getByUsers(): Promise<User[]> {
    return await this.userService.getByAll();
  }

  // Получение определенного пользователя по url:
  // GET localhost:5555/api/user/user_id
  @Get('/user_id')
  @Auth()
  async getById(@CurrentUser('id') id: number): Promise<User> {
    console.log(id);
    return await this.userService.getById(id);
  }

  @Get('/login')
  @Auth()
  async getByLogin(@CurrentUser('login') login: string): Promise<User> {
    console.log(login);
    return await this.userService.getByLogin(login);
  }
}
