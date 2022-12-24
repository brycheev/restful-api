import { IGetColumn } from '../models/column.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetColumnDto implements IGetColumn {
  @Transform(StringToNumberTransform)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  public id!: number;
}
