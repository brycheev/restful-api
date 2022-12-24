import { BadRequestException, Injectable } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { CardEntity } from './entities/card.entity';
import { ColumnService } from '../column/column.service';
import {
  ICreateCard,
  IDeleteCard,
  IFindCard,
  IGetCard,
  IUpdateCard,
} from './models/card.models';
import { CARD_NOT_FOUND } from './card.exceptions';

@Injectable()
export class CardService {
  private readonly cardRepository: CardRepository;
  private readonly columnService: ColumnService;

  constructor(cardRepository: CardRepository, columnService: ColumnService) {
    this.cardRepository = cardRepository;
    this.columnService = columnService;
  }

  async create(payload: ICreateCard): Promise<CardEntity> {
    const card = new CardEntity();
    const column = await this.columnService.get({
      id: payload.column_id,
    });

    card.column = column;
    card.example_data = payload.example_data;

    return await this.cardRepository.save(card);
  }

  async get(query: IGetCard): Promise<CardEntity> {
    const card = await this.cardRepository.get(query);
    if (!card) {
      throw new BadRequestException(CARD_NOT_FOUND);
    }

    return card;
  }

  async find(query: IFindCard): Promise<Array<CardEntity>> {
    const cards = await this.cardRepository.find(query);

    return cards;
  }

  async update(payload: IUpdateCard): Promise<CardEntity> {
    const card = await this.get({
      id: payload.id,
    });

    card.example_data = payload.example_data;

    return await this.cardRepository.save(card);
  }

  async delete(payload: IDeleteCard): Promise<void> {
    const card = await this.get({
      id: payload.id,
    });

    await this.cardRepository.delete(card);
  }

  async checkAccess({
    user_id,
    card_id,
  }: {
    user_id: number;
    card_id: number;
  }): Promise<boolean> {
    const card = await this.get({
      id: card_id,
    });

    return card.column.user.id === user_id;
  }
}
