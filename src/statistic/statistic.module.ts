import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from 'src/entity/statistic.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Statistic])],
  providers: [StatisticService],
  controllers: [StatisticController]
})
export class StatisticModule {}
