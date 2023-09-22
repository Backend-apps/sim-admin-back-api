import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TariffService } from './tariff.service';
import { Tariff } from 'src/entity/tariff.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('tariff')
export class TariffController {
  constructor(
    private readonly tariffService: TariffService,
    private jwtService: JwtService,
  ) {}

  @Get('/all')
  async getAllTariff(): Promise<Tariff> {
    try {
      return await this.tariffService.getAllTariff();
    } catch (error) {
      return error;
    }
  }

  @Get('/category')
  async getAlltariffCategory(){
    try {
      return await this.tariffService.getAllTariffCategory()
    } catch (error) {
      return error
    }
  }

  @Get('/:tariffId')
  async getOneTariff(@Param('tariffId') tariffId: number): Promise<Tariff> {
    try {
      return await this.tariffService.getOneTariff(tariffId);
    } catch (error) {
      return error;
    }
  }

  @Post('/add')
  async createTariff(
    @Body() tariff: Tariff,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<any> {
    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer == 'Bearer' && token) {
      const { id } = await this.jwtService.verifyAsync(token);
      return this.tariffService.createTariff(tariff, id);
    }

    try {
    } catch (error) {
      return error;
    }
  }

  @Put('/edit/:tariffId')
  async editTariff(
    @Body() tariff: Tariff,
    @Param('tariffId') tariffId: number,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<boolean | any> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');
      
      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        
        return await this.tariffService.updateTariff(tariff, id, tariffId);
      }
    } catch (error) {
      return error;
    }
  }

  @Delete('/remove/:tariffId')
  async deleteTariff(
    @Headers('authorization') authorizationHeader: string,
    @Param('tariffId') tariffId:number):Promise<any>{
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        return await this.tariffService.deleteTariff(id,tariffId)
      }
    } catch (error) {
      return error
    }
  }
}
