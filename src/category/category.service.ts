import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_QUERY,
  GET_ONE_QUERY,
  UPDATE_CATEGORY,
} from './category.query';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category> {
    try {
      const res = await this.categoryRepository.query(GET_ALL_QUERY);
      return res[0];
    } catch (error) {
      return error;
    }
  }

  async getOneCategory(id: number): Promise<Category> {
    try {
      const resOne = await this.categoryRepository.query(GET_ONE_QUERY, [id]);
      return resOne[0];
    } catch (error) {
      return error;
    }
  }

  async createCategory(category): Promise<Category> {
    try {
      const dataJson = JSON.stringify(category);

      const createRes = await this.categoryRepository.query(CREATE_CATEGORY, [
        dataJson,
        1,
        '',
      ]);
      console.log(createRes);
      const dataJsonParse = JSON.parse(createRes[0].result);
      return dataJsonParse;
    } catch (error) {
      throw error;
    }
  }

  async editCategory(category, categoryId,adminId): Promise<Category> {
    try {
      const oldCategory = await this.categoryRepository.query(GET_ONE_QUERY, [
        categoryId,
      ]);
      const newCategory = {
        admin_id:adminId,
        name: category.name ? category.name : oldCategory[0].get_one_category.name,
        category_id: categoryId,
        company_name: category.company_name
          ? category.company_name
          : oldCategory[0].get_one_category.company_name,
        status: category.status ? category.status : oldCategory[0].get_one_category.status,
      };

      const dataJson = JSON.stringify(newCategory);
      const updateData = await this.categoryRepository.query(UPDATE_CATEGORY, [
        dataJson,
        true,
      ]);
      console.log(updateData);
      return updateData;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(adminId, categoryId): Promise<any> {
    try {
      const deleteData = await this.categoryRepository.query(DELETE_CATEGORY, [
        adminId,
        categoryId,
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
