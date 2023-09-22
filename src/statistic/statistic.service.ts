import { Injectable } from '@nestjs/common';
import { Statistic } from 'src/entity/statistic.entity';
import { Repository } from 'typeorm';
import { GET_ALL } from './statistic.query';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private statisticRepository: Repository<Statistic>,
  ) {}

  async getAll(): Promise<any> {
    try {
      const data = await this.statisticRepository.query(GET_ALL, []);
      return data[0].get_all_package_counter_month;
    } catch (error) {
      throw error;
    }
  }

}
