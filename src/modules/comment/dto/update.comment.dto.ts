import { IUpdateComment } from '../models/comment.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto implements IUpdateComment {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public text!: string;
}
