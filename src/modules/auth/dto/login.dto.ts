import { ILogin } from '../models/auth.models';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto implements ILogin {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public password!: string;
}
