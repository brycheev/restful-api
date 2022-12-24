import { IFindColumn } from '../models/column.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindColumnDto implements IFindColumn {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  public cardId?: number;
}
