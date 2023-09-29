import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('/all')
  async getAll(): Promise<any> {
    try {
      return await this.statisticService.getAll();
    } catch (error) {
      return error;
    }
  }

  @Get('/devices')
  async getDevices(): Promise<any> {
    try {
      return this.statisticService.getAllDevice();
    } catch (error) {
      return error;
    }
  }

  @Get('/charts')
  async getAllCharts(): Promise<any> {
    try {
      return this.statisticService.getAllChart();
    } catch (error) {
      return error;
    }
  }
}
