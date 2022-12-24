import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './entities/comment.entity';
import { CardService } from '../card/card.service';
import {
  ICreateComment,
  IFindComment,
  IGetComment,
  IUpdateComment,
} from './models/comment.models';
import { COMMENT_NOT_FOUND } from './comment.exceptions';

@Injectable()
export class CommentService {
  private readonly commentRepository: CommentRepository;
  private readonly cardService: CardService;

  constructor(commentRepository: CommentRepository, cardService: CardService) {
    this.commentRepository = commentRepository;
    this.cardService = cardService;
  }

  async create(payload: ICreateComment): Promise<CommentEntity> {
    const comment = new CommentEntity();
    const card = await this.cardService.get({
      id: payload.card_id,
    });

    comment.card = card;
    comment.text = payload.text;

    return await this.commentRepository.save(comment);
  }

  async get(query: IGetComment): Promise<CommentEntity> {
    const comment = await this.commentRepository.get(query);
    if (!comment) {
      throw new BadRequestException(COMMENT_NOT_FOUND);
    }

    return comment;
  }

  async find(query: IFindComment): Promise<Array<CommentEntity>> {
    const comments = await this.commentRepository.find(query);

    return comments;
  }

  async update(payload: IUpdateComment): Promise<CommentEntity> {
    const comment = await this.get({
      id: payload.id,
    });

    comment.text = payload.text;

    return await this.commentRepository.save(comment);
  }

  async delete(payload): Promise<void> {
    const comment = await this.get({
      id: payload.id,
    });

    return await this.commentRepository.delete(comment);
  }

  async checkAccess({
    user_id,
    comment_id,
  }: {
    user_id: number;
    comment_id: number;
  }): Promise<boolean> {
    const comment = await this.get({
      id: comment_id,
    });

    return comment.card.column.user.id === user_id;
  }
}
