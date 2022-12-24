import { IFindComment } from '../models/comment.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindCommentDto implements IFindComment {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  public cardId?: number;
}
