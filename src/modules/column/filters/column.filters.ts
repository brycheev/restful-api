import { SelectQueryBuilder } from 'typeorm';
import { ColumnEntity } from '../entities/column.entity';

export const filterByCardId = (
  query: SelectQueryBuilder<ColumnEntity>,
  cardId: number | undefined,
): SelectQueryBuilder<ColumnEntity> => {
  if (!cardId) return query;

  query.andWhere('cards.id = :cardId', { cardId });

  return query;
};
