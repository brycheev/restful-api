import { ICreateComment } from '../models/comment.models';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';

export class CreateCommentDto implements ICreateComment {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  public card_id!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public text!: string;
}
