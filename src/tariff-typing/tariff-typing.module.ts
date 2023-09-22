import { Module } from '@nestjs/common';
import { TariffTypingController } from './tariff-typing.controller';
import { TariffTypingService } from './tariff-typing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffTyping } from 'src/entity/tariff-typing.entity';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports:[TypeOrmModule.forFeature([TariffTyping]),JwtModule],
  controllers: [TariffTypingController],
  providers: [TariffTypingService]
})
export class TariffTypingModule {}
