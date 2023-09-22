import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
    constructor(
        private readonly statisticService:StatisticService
    ){}

    @Get('/all')
    async getAll():Promise<any>{
        try {
            return await this.statisticService.getAll()
        } catch (error) {
            return error
        }
    }
}
