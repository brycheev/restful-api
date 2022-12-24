import { IDeleteCard } from '../models/card.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCardDto implements IDeleteCard {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  public id!: number;
}
