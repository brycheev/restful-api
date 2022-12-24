import { IUpdateCard } from '../models/card.models';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';

export class UpdateCardDto implements IUpdateCard {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public example_data!: string;
}
