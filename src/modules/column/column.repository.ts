import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ColumnEntity } from './entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindColumn, IGetColumn } from './models/column.models';
import { filterByCardId } from './filters/column.filters';

@Injectable()
export class ColumnRepository {
  private readonly columnRepository: Repository<ColumnEntity>;

  constructor(
    @InjectRepository(ColumnEntity)
    columnRepository: Repository<ColumnEntity>,
  ) {
    this.columnRepository = columnRepository;
  }

  async getQueryBuilder(
    alias: string,
  ): Promise<SelectQueryBuilder<ColumnEntity>> {
    const queryBuilder = this.columnRepository.createQueryBuilder(alias);

    return queryBuilder;
  }

  async save(payload: ColumnEntity): Promise<ColumnEntity> {
    const column = await this.columnRepository.save(payload);

    return column;
  }

  async get(query: IGetColumn): Promise<ColumnEntity> {
    const columnQuery = await this.getQueryBuilder('column');

    columnQuery.leftJoinAndSelect('column.user', 'user');
    columnQuery.leftJoinAndSelect('column.cards', 'cards');

    columnQuery.where('column.id = :id', { id: query.id });

    const column = await columnQuery.getOne();

    return column;
  }

  async find(query: IFindColumn): Promise<Array<ColumnEntity>> {
    let columnQuery = await this.getQueryBuilder('column');

    columnQuery.leftJoinAndSelect('column.user', 'user');
    columnQuery.leftJoinAndSelect('column.cards', 'cards');

    if (query) {
      columnQuery = filterByCardId(columnQuery, query.cardId);
    }

    const columns = await columnQuery.getMany();

    return columns;
  }

  async delete(payload: ColumnEntity): Promise<void> {
    await this.columnRepository.remove(payload);
  }
}
