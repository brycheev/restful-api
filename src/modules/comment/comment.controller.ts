import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create.comment.dto';
import { DeleteCommentDto } from './dto/delete.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { GetCommentDto } from './dto/get.comment.dto';
import { FindCommentDto } from './dto/find.comment.dto';
import { CommentGuard } from '../../shared/guards/comment.guard';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('comment')
export class CommentController {
  private readonly commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  @Post('create')
  async create(@Body() payload: CreateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentService.create(payload);

    return comment;
  }

  @Get('find')
  async find(@Query() query: FindCommentDto): Promise<Array<CommentEntity>> {
    const comments = await this.commentService.find(query);

    return comments;
  }

  @Get('get')
  async get(@Query() query: GetCommentDto): Promise<CommentEntity> {
    const comment = await this.commentService.get(query);

    return comment;
  }

  @UseGuards(CommentGuard)
  @Patch('update')
  async update(@Body() payload: UpdateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentService.update(payload);

    return comment;
  }

  @UseGuards(CommentGuard)
  @Delete('delete')
  async delete(@Body() payload: DeleteCommentDto): Promise<void> {
    await this.commentService.delete(payload);
  }
}
