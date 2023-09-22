import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tariff } from 'src/entity/tariff.entity';
import { Repository } from 'typeorm';
import {
  CREATE_TARIFF,
  DELETE_TARIFF,
  GET_ALL_QUERY,
  GET_ALL_TARIFFS_CATEGORY,
  GET_ONE_QUERY,
  UPDATED_TARIFF,
} from './tariff.query';

@Injectable()
export class TariffService {
  constructor(
    @InjectRepository(Tariff)
    private tariffRepository: Repository<Tariff>,
  ) {}

  async getAllTariff(): Promise<Tariff> {
    try {
      const allRes = await this.tariffRepository.query(GET_ALL_QUERY);
      return allRes[0];
    } catch (error) {
      throw error;
    }
  }


  async getAllTariffCategory():Promise<any>{
    try {
      const getAllCategory = await this.tariffRepository.query(GET_ALL_TARIFFS_CATEGORY)
      if(getAllCategory){
        return JSON.parse(getAllCategory[0].get_all_category_tariff)
      }
    } catch (error) {
      throw error;
    }
  }

  async getOneTariff(id): Promise<Tariff> {
    try {
      const oneRes = await this.tariffRepository.query(GET_ONE_QUERY, [id]);
      return oneRes[0];
    } catch (error) {
      throw error;
    }
  }

  async createTariff(tariff, status): Promise<Tariff> {
    try {
      const tariffJson = JSON.stringify(tariff);
      const createData = await this.tariffRepository.query(CREATE_TARIFF, [
        tariffJson,
        status,
        '',
      ]);
      return JSON.parse(createData[0].result);
    } catch (error) {
      throw error;
    }
  }

  async updateTariff(tariff, id, t_id): Promise<boolean> {
    try {
      const oldtariff: any = await this.tariffRepository.query(GET_ONE_QUERY, [
        t_id,
      ]);
      const editTariff = {
        admin_id: id,
        tariff_id: t_id,
        title: tariff.title ? tariff.title : oldtariff[0].get_one_tariff.title,

        description: tariff.description
          ? tariff.description
          : oldtariff[0].get_one_tariff.description,

        price: tariff.price ? tariff.price : oldtariff[0].get_one_tariff.price,

        deadline: tariff.deadline
          ? tariff.deadline
          : oldtariff[0].get_one_tariff.deadline,

        sms: tariff.sms ? tariff.sms : oldtariff[0].get_one_tariff.sms,

        minutes: tariff.minutes
          ? tariff.minutes
          : oldtariff[0].get_one_tariff.minutes,

        mega_byte: tariff.mega_byte
          ? tariff.mega_byte
          : oldtariff[0].get_one_tariff.mega_byte,

        sale: tariff.sale ? tariff.sale : oldtariff[0].get_one_tariff.sale,
        ussd_code: tariff.ussd_code
          ? tariff.ussd_code
          : oldtariff[0].get_one_tariff.ussd_code,

        tariff_typing_id: tariff.tariff_typing_id
          ? tariff.tariff_typing_id
          : oldtariff[0].get_one_tariff.tariff_typing_id,

        status: tariff.status
          ? tariff.status
          : oldtariff[0].get_one_tariff.status,
      };
      const dataJson = JSON.stringify(editTariff);
      console.log(dataJson);
      const newTariff = await this.tariffRepository.query(UPDATED_TARIFF, [
        dataJson,
        true,
      ]);
      console.log(newTariff)
      return newTariff;
    } catch (error) {
      throw error;
    }
  }

  async deleteTariff(admin_id, id): Promise<Tariff> {
    try {
      return await this.tariffRepository.query(DELETE_TARIFF, [
        admin_id,
        id,
        true,
      ]);
    } catch (error) {
      throw error;
    }
  }
}
