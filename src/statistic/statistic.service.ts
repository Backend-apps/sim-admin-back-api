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
      let month_id = 0;
      packages?.forEach((pack: any) => {
        console.log(pack);
        const orderDate = new Date(pack.order_date);
        const month = orderDate.toLocaleString('default', { month: 'long' });
        const week = Math.ceil(orderDate.getDate() / 7);
        const day = orderDate.toLocaleString('default', { weekday: 'long' });

        month_id++;

        if (!statistics[month]) {
          statistics[month] = {
            total: 0,
            week1: [],
            week2: [],
            week3: [],
            week4: [],
            month_id,
          };
        }
        statistics[month].total++;
        statistics[month].month_id;
        const weekData = {
          [day]: 1,
          date: `${orderDate.getDay()} - ${month}`,
          device: pack.device_id,
          name: pack.device_name,
        };
        if (week === 1) {
          weekData.week_id = 1;
          statistics[month].week1.push(weekData);
        } else if (week === 2) {
          weekData.week_id = 2;
          statistics[month].week2.push(weekData);
        } else if (week === 3) {
          weekData.week_id = 3;
          statistics[month].week3.push(weekData);
        } else if (week === 4) {
          weekData.week_id = 4;
          statistics[month].week4.push(weekData);
        }
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
          ios:
            data?.filter(
              (el: any) => el?.model === 'iPhone' || el?.model === 'iPad',
            ).length - 1,
          android:
            data?.filter(
              (el: any) => el?.model !== 'iPhone' || el?.model !== 'iPhone',
            ).length - 1,
          all: data.length - 1,
        };
      } else {
        return 'something went to wrong';
      }
    } catch (error) {
      throw error;
    }
  }

  async getDeviceChart(): Promise<any> {
    try {
      let res = await fetch(
        'http://ussd.coreteam.uz:8092/api/v1/device/get/all',
      );
      const { data } = await res.json();
      if (data) {
        return this.sortMonth(data);
      } else {
        return 'something went to wrong';
      }
    } catch (error) {
      throw error;
    }
  }

  sortMonth(data) {
    const createdMonthCounts = {};
    data.forEach((device) => {
      const createdDate = new Date(device.createdDateTime);
      const month = createdDate.toLocaleString('uz-UZ', { month: 'numeric' });
      const year = createdDate.toLocaleString('uz-UZ', { year: 'numeric' });
      if (!createdMonthCounts[year]) {
        createdMonthCounts[year] = {
          year: Number(year),
          ios: Array(12).fill(0),
          android: Array(12).fill(0),
        };
      }
      if (device.model === 'iPhone' || device.model === 'iPad') {
        createdMonthCounts[year].ios[parseInt(month) - 1]++;
      } else {
        createdMonthCounts[year].android[parseInt(month) - 1]++;
      }
    });
    const result = Object.values(createdMonthCounts);

    return result;
  }
}
