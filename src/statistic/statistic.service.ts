import { Injectable } from '@nestjs/common';
import { Statistic } from 'src/entity/statistic.entity';
import { Repository } from 'typeorm';
import { GET_ALL, MonthlyStatistic } from './statistic.query';
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

  async getMonthWeekDay(): Promise<any> {
    try {
      const data = await this.statisticRepository.query(GET_ALL, []);
      const packages = data[0].get_all_package_counter_month;

      let statistics = {};

      packages?.forEach((pack: any) => {
        const orderDate = new Date(pack.order_date);
        const month = orderDate.toLocaleString('default', { month: 'long' });
        const week = Math.ceil(orderDate.getDate() / 7);
        const day = orderDate.toLocaleString('default', { weekday: 'long' });

        if (!statistics[month]) {
          statistics[month] = { total: 0, weeks: {}, days: {} };
        }
        statistics[month].total++;

        if (!statistics[month].weeks[week]) {
          statistics[month].weeks[week] = 0;
        }
        statistics[month].weeks[week]++;

        if (!statistics[month].days[day]) {
          statistics[month].days[day] = 0;
        }
        statistics[month].days[day]++;
      });

      return statistics;
    } catch (error) {
      throw error;
    }
  }

  async getAllChart(): Promise<any> {
    try {
      const data = await this.statisticRepository.query(GET_ALL, []);
      const orders: MonthlyStatistic[] = data[0].get_all_package_counter_month;
      let moonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < orders.length; i++) {
        const monthId = orders[i].month_id;
        console.log(monthId);
        switch (monthId) {
          case 1:
            moonths[0] = orders[i].package_total_count;
            break;
          case 2:
            moonths[1] = orders[i].package_total_count;
            break;
          case 3:
            moonths[2] = orders[i].package_total_count;
            break;
          case 4:
            moonths[3] = orders[i].package_total_count;
            break;
          case 5:
            moonths[4] = orders[i].package_total_count;
            break;
          case 6:
            moonths[5] = orders[i].package_total_count;
            break;
          case 7:
            moonths[6] = orders[i].package_total_count;
            break;
          case 8:
            moonths[7] = orders[i].package_total_count;
            break;
          case 9:
            moonths[8] = orders[i].package_total_count;
            break;
          case 10:
            moonths[9] = orders[i].package_total_count;
            break;
          case 11:
            moonths[10] = orders[i].package_total_count;
            break;
          case 12:
            moonths[11] = orders[i].package_total_count;
            break;
          default:
            break;
        }
      }
      return moonths;
    } catch (error) {
      throw error;
    }
  }

  async getAllDevice(): Promise<any> {
    try {
      let res = await fetch(
        'http://ussd.coreteam.uz:8092/api/v1/device/get/all',
      );
      const { data } = await res.json();
      if (data) {
        return {
          ios: data?.filter(
            (el: any) => el?.model === 'iPhone' || el?.model === 'iPad',
          ).length,
          android: data?.filter(
            (el: any) => el?.model !== 'iPhone' || el?.model !== 'iPhone',
          ).length,
        };
      } else {
        return 'something went to wrong';
      }
    } catch (error) {
      throw error;
    }
  }
}
