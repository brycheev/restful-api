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
import { CardService } from './card.service';
import { CardEntity } from './entities/card.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { CreateCardDto } from './dto/create.card.dto';
import { FindCardDto } from './dto/find.card.dto';
import { GetCardDto } from './dto/get.card.dto';
import { UpdateCardDto } from './dto/update.card.dto';
import { DeleteCardDto } from './dto/delete.card.dto';
import { CardGuard } from '../../shared/guards/card.guard';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('card')
export class CardController {
  private readonly cardService: CardService;

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() payload: CreateCardDto): Promise<CardEntity> {
    const card = await this.cardService.create(payload);

    return card;
  }

  @Get('find')
  async find(@Query() query: FindCardDto): Promise<Array<CardEntity>> {
    const cards = await this.cardService.find(query);

    return cards;
  }

  @Get('get')
  async get(@Query() query: GetCardDto): Promise<CardEntity> {
    const card = await this.cardService.get(query);

    return card;
  }

  @UseGuards(CardGuard)
  @Patch('update')
  async update(@Body() payload: UpdateCardDto): Promise<CardEntity> {
    const card = await this.cardService.update(payload);

    return card;
  }

  @UseGuards(CardGuard)
  @Delete('delete')
  async delete(@Body() payload: DeleteCardDto): Promise<void> {
    await this.cardService.delete(payload);
  }
}
