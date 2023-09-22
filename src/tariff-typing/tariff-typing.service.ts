import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TariffTyping } from 'src/entity/tariff-typing.entity';
import { Repository } from 'typeorm';
import {
  GET_ALL_QUERY,
  CREATE_QUERY,
  DELETE_QUERY,
  GET_ONE_QUERY,
  UPDATE_QUERY,
  GET_ALL_TYPING,
} from './tariff-typing.query';

@Injectable()
export class TariffTypingService {
  constructor(
    @InjectRepository(TariffTyping)
    private tariffTypingRepository: Repository<TariffTyping>,
  ) {}

  async getAll(): Promise<any> {
    try {
      const res = await this.tariffTypingRepository.query(GET_ALL_QUERY);
      if (res) return res[0].get_all_tariff_typing;
    } catch (error) {
      return error;
    }
  }

  async getAllTypingTariffs(id): Promise<TariffTyping | any> {
    try {
      const data = await this.tariffTypingRepository.query(GET_ALL_TYPING, [
        id,
      ]);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number): Promise<any> {
    try {
      const resOne = await this.tariffTypingRepository.query(GET_ONE_QUERY, [
        id,
      ]);
      return resOne[0];
    } catch (error) {
      return error;
    }
  }

  async create(typing, adminId): Promise<any> {
    try {
      const dataJson = JSON.stringify(typing);
      console.log(dataJson);
      const createRes = await this.tariffTypingRepository.query(CREATE_QUERY, [
        dataJson,
        adminId,
        '',
      ]);
      const dataJsonParse = JSON.parse(createRes[0].result);
      return dataJsonParse;
    } catch (error) {
      throw error;
    }
  }

  async edit(typing, typingId, adminId): Promise<any> {
    try {
      const oldtyping = await this.tariffTypingRepository.query(GET_ONE_QUERY, [
        typingId,
      ]);
      const newTyping = {
        admin_id: adminId,
        name: typing.name ? typing.name : oldtyping[0].name,
        typing_id: typingId,
        company_name: typing.company_name
          ? typing.company_name
          : oldtyping[0].company_name,
        status: typing.status ? typing.status : oldtyping[0].status,
      };

      const dataJson = JSON.stringify(newTyping);

      const updateData = await this.tariffTypingRepository.query(UPDATE_QUERY, [
        dataJson,
        true,
      ]);
      return updateData;
    } catch (error) {
      throw error;
    }
  }

  async delete(adminId, typeingId): Promise<any> {
    try {
      const deleteData = await this.tariffTypingRepository.query(DELETE_QUERY, [
        adminId,
        typeingId,
        true,
      ]);

      if (deleteData[0].result) {
        return {
          status: 201,
          message: 'Category successfuly deleted',
        };
      } else {
        return {
          status: 404,
          message: 'Category not found',
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
