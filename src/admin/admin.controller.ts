import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/entity';
import {
  Body,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcript.service';
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
    private bcriptService: BcryptService,
  ) {}

  @Get('/all')
  async getAllAdmins(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<Admin> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        const admins: any = await this.adminService.getAllAdmins(id);
        return {
          status: 200,
          message: 'success',
          admins: admins.filter((el: Admin) => el.status !== -1),
        } as any;
      }
    } catch (error) {
      return error;
    }
  }

  @Get('/:adminId')
  async getOneAdmin(
    @Headers('authorization') authorizationHeader: string,
    @Param('adminId') adminId: number,
  ): Promise<Admin> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.adminService.getOneAdmin(id, adminId);
      }
    } catch (error) {
      return error;
    }
  }

  @Post('/login')
  async login(@Body() data: Admin): Promise<Admin> {
    try {
      const res = await this.adminService.login(data);
      const token = await this.jwtService.signAsync({
        status: res.status,
        id: res.admin_id,
      });
      return {
        status: 200,
        message: 'success',
        token: token,
      } as any;
    } catch (error) {
      return error;
    }
  }

  @Post('/register')
  async register(@Body() admin: Admin): Promise<Admin> {
    try {
      const res = await this.adminService.register(admin);
      const data = JSON.parse(res[0].result);

      const token = await this.jwtService.signAsync({
        status: data.status,
        id: data.admin_id,
      });

      return {
        admin_id: data.admin_id,
        login: data.login,
        status: data.status,
        token: token,
      } as any;
    } catch (error) {
      return error;
    }
  }

  // @Put('edit/:adminId')
  // async editAdmin(
  //   @Body() admin: Admin,
  //   @Param() adminId: number,
  //   @Headers('authorization') authorizationHeader: string,
  // ): Promise<Admin> {
  //   const [bearer, token] = authorizationHeader.split(' ');
  //   if (bearer == 'Bearer' && token) {
  //     const { id } = await this.jwtService.verifyAsync(token);
  //     return this.adminService.editAdmin()
  //   }
  //   try {
  //   } catch (error) {}
  // }

  @Delete('/remove/:adminId')
  async deleteAdmin(
    @Headers('authorization') authorizationHeader: string,
    @Param('adminId') adminId: number,
  ): Promise<Admin> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.adminService.deleteAdmin(id, adminId);
      }
    } catch (error) {
      throw error;
    }
  }
}
