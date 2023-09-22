import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { JwtModule } from 'src/jwt/jwt.module';
@Module({
  imports: [TypeOrmModule.forFeature([Category]), JwtModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
