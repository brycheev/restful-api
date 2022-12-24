import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { ColumnService } from './column.service';
import { ColumnRepository } from './column.repository';
import { ColumnController } from './column.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ColumnEntity])],
  providers: [ColumnService, ColumnRepository, JwtService],
  controllers: [ColumnController],
  exports: [ColumnService, ColumnRepository],
})
export class ColumnModule {}
