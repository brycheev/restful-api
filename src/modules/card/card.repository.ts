import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CardEntity } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindCard, IGetCard } from './models/card.models';
import { filterByColumnId } from './filters/card.filters';

@Injectable()
export class CardRepository {
  private readonly cardRepository: Repository<CardEntity>;

  constructor(
    @InjectRepository(CardEntity)
    cardRepository: Repository<CardEntity>,
  ) {
    this.cardRepository = cardRepository;
  }

  async getQueryBuilder(
    alias: string,
  ): Promise<SelectQueryBuilder<CardEntity>> {
    const queryBuilder = await this.cardRepository.createQueryBuilder(alias);

    return queryBuilder;
  }

  async save(payload: CardEntity): Promise<CardEntity> {
    const card = await this.cardRepository.save(payload);

    return card;
  }

  async get(query: IGetCard): Promise<CardEntity> {
    const cardQuery = await this.getQueryBuilder('card');

    cardQuery.leftJoinAndSelect('card.column', 'column');
    cardQuery.leftJoinAndSelect('column.user', 'user');
    cardQuery.where('card.id = :id', { id: query.id });

    const card = await cardQuery.getOne();

    return card;
  }

  async find(query: IFindCard): Promise<Array<CardEntity>> {
    let cardQuery = await this.getQueryBuilder('card');

    cardQuery.leftJoinAndSelect('card.column', 'column');

    if (query) {
      cardQuery = filterByColumnId(cardQuery, query.columnId);
    }

    const cards = await cardQuery.getMany();

    return cards;
  }

  async delete(payload: CardEntity): Promise<void> {
    await this.cardRepository.remove(payload);
  }
}
