import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/entity/package.entity';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), JwtModule],
  providers: [PackagesService],
  controllers: [PackagesController],
})
export class PackagesModule {}
