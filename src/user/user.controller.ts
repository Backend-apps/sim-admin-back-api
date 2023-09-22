import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post('/create')
  create(@Body() user: User): Promise<User> {
    try {
      return this.userService.create(user);
    } catch (error) {
      throw error;
    }
  }

  @Put('/edit/:id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<User> {
    try {
      return this.userService.editData(1, user);
    } catch (error) {
      return error;
    }
  }

}
