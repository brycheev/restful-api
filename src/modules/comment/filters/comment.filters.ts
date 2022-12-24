import { SelectQueryBuilder } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';

export const filterByCardId = (
  query: SelectQueryBuilder<CommentEntity>,
  cardId: number | undefined,
): SelectQueryBuilder<CommentEntity> => {
  if (!cardId) return query;

  query.andWhere('card.id = :cardId', { cardId });

  return query;
};
