import { IUpdateColumn } from '../models/column.models';
import { Transform } from 'class-transformer';
import { StringToNumberTransform } from '../../../shared/transformers/string-to-number.transform';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateColumnDto implements IUpdateColumn {
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
