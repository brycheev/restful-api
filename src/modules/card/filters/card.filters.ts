import { SelectQueryBuilder } from 'typeorm';
import { CardEntity } from '../entities/card.entity';

export const filterByColumnId = (
  query: SelectQueryBuilder<CardEntity>,
  columnId: number | undefined,
): SelectQueryBuilder<CardEntity> => {
  if (!columnId) return query;

  query.andWhere('column.id = :columnId', { columnId });

  return query;
};
