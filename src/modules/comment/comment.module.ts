import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { CardModule } from '../card/card.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), CardModule],
  providers: [CommentService, CommentRepository, JwtService],
  controllers: [CommentController],
})
export class CommentModule {}
