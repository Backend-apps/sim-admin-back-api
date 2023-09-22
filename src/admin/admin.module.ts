import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity';
import { JwtModule } from 'src/jwt/jwt.module';
import { BcryptService } from './bcript.service';
@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule],
  providers: [AdminService,BcryptService],
  controllers: [AdminController],
})
export class AdminModule {}
