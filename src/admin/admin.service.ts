import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entity';
import { Repository } from 'typeorm';
import {
  REGISTER,
  LOGIN,
  GET_ALL_QUERY,
  GET_ONE_QUERY,
  UPDATED_ADMIN,
  DELETE_ADMIN,
} from './admin.query';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async getAllAdmins(id: number): Promise<Admin> {
    try {
      console.log(id)
      const admins = await this.adminRepository.query(GET_ALL_QUERY, [id]);
      return admins[0]?.get_all_admin;
    } catch (error) {
      throw error;
    }
  }

  async getOneAdmin(adminId:number, findAdminId:number): Promise<Admin> {
    try {
    
      const admin = await this.adminRepository.query(GET_ONE_QUERY, [
        adminId,
        findAdminId,
      ]);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async login(data: Admin): Promise<any> {
    try {
      const dataJson = JSON.stringify(data);
      const admin = await this.adminRepository.query(LOGIN, [dataJson]);
      return admin[0].login_admin;
    } catch (error) {
      throw error;
    }
  }

  async register(admin): Promise<Admin> {
    try {
      const adminJson = JSON.stringify(admin);
      const data = await this.adminRepository.query(REGISTER, [
        adminJson,
        0,
        '',
      ]);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editAdmin(data,adminId, editedAdminId): Promise<Admin> {
    try {
      const oldAdmin = await this.adminRepository.query(GET_ONE_QUERY,[adminId])
      const deletedAdmin = await this.adminRepository.query(UPDATED_ADMIN, [
        adminId,
        editedAdminId,
        true,
      ]);
      return deletedAdmin;
    } catch (error) {
      throw error;
    }
  }

  async deleteAdmin(adminId,deletedAdminId):Promise<Admin>{
    try {
      const deletedAdmin = await this.adminRepository.query(DELETE_ADMIN, [
        adminId,
        deletedAdminId,
        true,
      ]);
      return deletedAdmin;
    } catch (error) {
      throw error;
    }
  }
}
