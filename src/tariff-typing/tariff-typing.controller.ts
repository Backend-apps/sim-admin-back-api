import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Headers,
} from '@nestjs/common';
import { TariffTypingService } from './tariff-typing.service';
import { JwtService } from '@nestjs/jwt';
import { TariffTyping } from 'src/entity/tariff-typing.entity';
@Controller('tariff-typing')
export class TariffTypingController {
  constructor(
    private readonly tariffService: TariffTypingService,
    private jwtService: JwtService,
  ) {}

  @Get('/all')
  async getAlldata(): Promise<TariffTyping | any> {
    try {
      return await this.tariffService.getAll();
    } catch (error) {
      return error;
    }
  }

  @Get('/tariffs/:typingId')
  async getTypingAllTariffs(
    @Param('typingId') typingId: number,
  ): Promise<TariffTyping> {
    try {
      return await this.tariffService.getAllTypingTariffs(typingId);
    } catch (error) {
      return error;
    }
  }

  @Get('/:typeingId')
  async getOnedata(
    @Param('typeingId') typeingId: number,
  ): Promise<TariffTyping> {
    try {
      return this.tariffService.getOne(typeingId);
    } catch (error) {
      return error;
    }
  }

  @Post('/add')
  async createdata(
    @Headers('authorization') authorizationHeader: string,
    @Body() typeing: TariffTyping,
  ): Promise<TariffTyping> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.tariffService.create(typeing, id);
      }
    } catch (error) {
      return error;
    }
  }

  @Put('edit/:typeingId')
  async editdata(
    @Body() typeing: TariffTyping,
    @Param('typeingId') typeingId: number,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<TariffTyping> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        const data = await this.tariffService.edit(typeing, typeingId,id);
        if (data[0].result) {
          return {
            status: 201,
            message: 'data successfuly updated',
          } as any;
        } else {
          return JSON.parse(data[0].result);
        }
      }
    } catch (error) {
      return error;
    }
  }

  @Delete('/remove/:typeingId')
  async removedata(
    @Param('typeingId') typeingId: number,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<TariffTyping | any> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        return 'not token';
      } else {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.tariffService.delete(id, typeingId);
      }
    } catch (error) {
      return error;
    }
  }
}
