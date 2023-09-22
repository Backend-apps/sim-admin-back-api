import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Headers,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entity/category.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private jwtService: JwtService,
  ) {}

  @Get('/all')
  async getAllCategory(): Promise<Category> {
    try {
      return this.categoryService.getAllCategories();
    } catch (error) {
      return error;
    }
  }

  @Get('/:categoryId')
  async getOneCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<Category> {
    try {
      return this.categoryService.getOneCategory(categoryId);
    } catch (error) {
      return error;
    }
  }

  @Post('/add')
  async createCategory(@Body() category: Category): Promise<Category> {
    try {
      const data = await this.categoryService.createCategory(category);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Put('edit/:categoryId')
  async editCategory(
    @Body() category: Category,
    @Param('categoryId') categoryId: number,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<Category> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer == 'Bearer' && token) {
        const { id } = await this.jwtService.verifyAsync(token);
        const data = await this.categoryService.editCategory(
          category,
          categoryId,
          id,
        );

        if (data[0].result) {
          return {
            status: 201,
            message: 'category successfuly updated',
          } as any;
        } else {
          return JSON.parse(data[0].result);
        }
       
      }

      
    } catch (error) {
      return error;
    }
  }

  @Delete('/delete/:categoryId')
  async removeCategory(
    @Param('categoryId') categoryId: number,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<Category | any> {
    try {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        return 'not token';
      } else {
        const { id } = await this.jwtService.verifyAsync(token);
        return this.categoryService.deleteCategory(id, categoryId);
      }
    } catch (error) {
      return error;
    }
  }
}
