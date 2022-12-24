import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindComment, IGetComment } from './models/comment.models';
import { filterByCardId } from './filters/comment.filters';

@Injectable()
export class CommentRepository {
  private readonly commentRepository: Repository<CommentEntity>;

  constructor(
    @InjectRepository(CommentEntity)
    commentRepository: Repository<CommentEntity>,
  ) {
    this.commentRepository = commentRepository;
  }

  async getQueryBuilder(
    alias: string,
  ): Promise<SelectQueryBuilder<CommentEntity>> {
    const queryBuilder = await this.commentRepository.createQueryBuilder(alias);

    return queryBuilder;
  }

  async save(payload: CommentEntity): Promise<CommentEntity> {
    const comment = await this.commentRepository.save(payload);

    return comment;
  }

  async get(query: IGetComment): Promise<CommentEntity> {
    const commentQuery = await this.getQueryBuilder('comment');

    commentQuery.leftJoinAndSelect('comment.card', 'card');
    commentQuery.leftJoinAndSelect('card.column', 'column');
    commentQuery.leftJoinAndSelect('column.user', 'user');
    commentQuery.where('comment.id = :id', { id: query.id });

    const comment = await commentQuery.getOne();

    return comment;
  }

  async find(query: IFindComment): Promise<Array<CommentEntity>> {
    let commentQuery = await this.getQueryBuilder('comment');

    commentQuery.leftJoinAndSelect('comment.card', 'card');

    if (query) {
      commentQuery = filterByCardId(commentQuery, query.cardId);
    }

    const comments = await commentQuery.getMany();

    return comments;
  }

  async delete(payload: CommentEntity): Promise<void> {
    await this.commentRepository.remove(payload);
  }
}
