import { Body, Controller, Get, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from '../decorators/auth.decorator';
import { UpdateUserDto } from './dto/update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Получение всех пользователей по url:
  // GET localhost:5555/api/user/users
  @Get('/users')
  @Auth()
  public async getByUsers(): Promise<User[]> {
    return await this.userService.getByAll();
  }

  // Получение определенного пользователя по url:
  // GET localhost:5555/api/user/user_id
  @Get('/user_id')
  @Auth()
  public async getById(@CurrentUser('id') id: number): Promise<User> {
    return await this.userService.getById(id);
  }

  @Put()
  @Auth()
  public async update(
    @Body() dto: UpdateUserDto,
    @CurrentUser('id') id: number,
  ): Promise<User> {
    return await this.userService.update(dto, id);
  }

  @Get('/login')
  @Auth()
  public async getByLogin(@CurrentUser('login') login: string): Promise<User> {
    return await this.userService.getByLogin(login);
  }
}
