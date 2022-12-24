import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardRepository } from './card.repository';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { ColumnModule } from '../column/column.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity]), ColumnModule],
  providers: [CardService, CardRepository, JwtService],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
