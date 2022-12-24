import { ICreateColumn } from '../models/column.models';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto implements ICreateColumn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public example_data!: string;
}
