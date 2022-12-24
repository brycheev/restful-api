import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { CreateColumnDto } from './dto/create.column.dto';
import { ColumnEntity } from './entities/column.entity';
import { ExtractUser } from '../../shared/decorators/extract-user.decorator';
import { IUser } from '../user/models/user.models';
import { GetColumnDto } from './dto/get.column.dto';
import { ColumnGuard } from '../../shared/guards/column.guard';
import { DeleteColumnDto } from './dto/delete.column.dto';
import { UpdateColumnDto } from './dto/update.column.dto';
import { FindColumnDto } from './dto/find.column.dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('column')
export class ColumnController {
  private readonly columnService: ColumnService;

  constructor(columnService: ColumnService) {
    this.columnService = columnService;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @ExtractUser() authorizedUser: IUser,
    @Body() payload: CreateColumnDto,
  ): Promise<ColumnEntity> {
    const column = await this.columnService.create(authorizedUser, payload);

    return column;
  }

  @Get('find')
  async find(@Query() query: FindColumnDto): Promise<Array<ColumnEntity>> {
    const columns = await this.columnService.find(query);

    return columns;
  }

  @Get('get')
  async get(@Query() query: GetColumnDto): Promise<ColumnEntity> {
    const column = await this.columnService.get(query);

    return column;
  }

  @UseGuards(ColumnGuard)
  @Patch('update')
  async update(@Body() payload: UpdateColumnDto): Promise<ColumnEntity> {
    const column = await this.columnService.update(payload);

    return column;
  }

  @UseGuards(ColumnGuard)
  @Delete('delete')
  async delete(@Body() payload: DeleteColumnDto): Promise<void> {
    await this.columnService.delete(payload);
  }
}
