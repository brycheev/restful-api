import { IFindCard } from '../models/card.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindCardDto implements IFindCard {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  public columnId?: number;
}
