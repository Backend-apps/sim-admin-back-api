import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/entity/package.entity';
import { Repository, ReturnDocument } from 'typeorm';
import {
  CREATED_PACKAGE,
  DELETE_PACKAGE,
  GET_ALL_PACKAGE,
  GET_ALL_PACKAGE_QUERY,
  GET_ONE_PACKAGE,
  UPDATE_PACKAGE,
} from './packages.query';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) {}

  async getAll(): Promise<Package> {
    try {
      const alldata = await this.packageRepository.query(GET_ALL_PACKAGE);
      return alldata[0];
    } catch (error) {
      throw error;
    }
  }

  async getOne(id): Promise<Package> {
    try {
      const oneData = await this.packageRepository.query(GET_ONE_PACKAGE, [id]);
      return oneData[0];
    } catch (error) {
      throw error;
    }
  }

  async createPackage(paket, status): Promise<Package> {
    try {
      const dataJson = JSON.stringify(paket);
      console.log(dataJson);
      const createdData = await this.packageRepository.query(CREATED_PACKAGE, [
        dataJson,
        status,
        '',
      ]);
      return JSON.parse(createdData[0].result);
    } catch (error) {
      throw error;
    }
  }

  async editPackage(paket, id, a_id): Promise<Package> {
    try {
      if (id) {
        const [oldPackage] = await this.packageRepository.query(
          GET_ONE_PACKAGE,
          [id],
        );
        const editedPackage = {
          admin_id: a_id,
          paket_id: id,
          package_name: paket.package_name
            ? paket.package_name
            : oldPackage.get_one_paket.package_name,
          category_id: paket.category_id
            ? paket.category_id
            : oldPackage.get_one_paket.category_id,
          deadline: paket.deadline
            ? paket.deadline
            : oldPackage.get_one_paket.deadline,
          from_date: paket.from_date
            ? paket.from_date
            : oldPackage.get_one_paket.from_date,
          end_date: paket.end_date
            ? paket.end_date
            : oldPackage.get_one_paket.end_date,
          price: paket.price ? paket.price : oldPackage.get_one_paket.price,
          ussd_code: paket.ussd_code
            ? paket.ussd_code
            : oldPackage.get_one_paket.ussd_code,
          description: paket.description
            ? paket.description
            : oldPackage.get_one_paket.description,
          sale: paket.sale ? paket.sale : oldPackage.get_one_paket.sale,
          status: paket.status ? paket.status : oldPackage.get_one_paket.status,
          type: paket.type ? paket.type : oldPackage.get_one_paket.type,
          internet_type: paket.internet_type
            ? paket.internet_type
            : oldPackage.get_one_paket.internet_type,
        };
        const dataJsonPackage = JSON.stringify(editedPackage);
        console.log(dataJsonPackage);
        const editedData = await this.packageRepository.query(UPDATE_PACKAGE, [
          dataJsonPackage,
          true,
        ]);
        return editedData;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllPackageCategory(): Promise<Package> {
    try {
      const [data] = await this.packageRepository.query(GET_ALL_PACKAGE_QUERY);
      return JSON.parse(data.get_all_category_paket);
    } catch (error) {
      throw error;
    }
  }

  async deletePackage(admin_id, p_id): Promise<boolean | any> {
    try {
      const deleteData = await this.packageRepository.query(DELETE_PACKAGE, [
        admin_id,
        p_id,
        true,
      ]);
      return deleteData;
    } catch (error) {
      throw error;
    }
  }
}
