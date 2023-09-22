import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/jwt/jwt.module';
import { Tariff } from 'src/entity/tariff.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Tariff]),JwtModule],
  providers: [TariffService],
  controllers: [TariffController]
})
export class TariffModule {}
