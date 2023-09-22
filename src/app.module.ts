import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Admin } from './entity';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { typeormConfig } from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { TariffModule } from './tariff/tariff.module';
import { PackagesModule } from './packages/packages.module';
import { ServiceModule } from './controller/service/service.module';
import { TariffTypingModule } from './tariff-typing/tariff-typing.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    CategoryModule,
    AdminModule,
    JwtModule,
    TariffModule,
    PackagesModule,
    ServiceModule,
    TariffTypingModule,
    StatisticModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
