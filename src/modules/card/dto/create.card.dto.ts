import { ICreateCard } from '../models/card.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto implements ICreateCard {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  public column_id!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public example_data!: string;
}
