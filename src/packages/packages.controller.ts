import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { JwtService } from '@nestjs/jwt';
import { Package } from 'src/entity/package.entity';

@Controller('packages')
export class PackagesController {
  constructor(
    private readonly packageService: PackagesService,
    private jwtService: JwtService,
  ) {}

  @Get('/all')
  async getAll(): Promise<Package> {
    try {
      return await this.packageService.getAll();
    } catch (error) {
      return error;
    }
  }


  @Get('/category')
  async getAllTariffCategory():Promise<Package>{
    try {
      return await this.packageService.getAllPackageCategory()
    } catch (error) {
      return error
    }
  }


  @Get('/:packageId')
  async getOne(@Param('packageId') packageId: number): Promise<Package> {
    try {
      return await this.packageService.getOne(packageId);
    } catch (error) {
      return error;
    }
  }

  
  @Post('/add')
  async createPackage(
    @Body() data: Package,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<Package> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.packageService.createPackage(data, id);
      }
    } catch (error) {
      return error;
    }
  }

  @Put('/edit/:packageId')
  async editPackage(
    @Body() data: Package,
    @Param('packageId') packageId: number,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<Package> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.packageService.editPackage(data, packageId, id);
      }
    } catch (error) {
      return error;
    }
  }

  @Delete('/remove/:packageId')
  async deletePackage(
    @Param('packageId') packageId: number,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<boolean | any> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.packageService.deletePackage(id, packageId);
      }
    } catch (error) {
      return error;
    }
  }
}
