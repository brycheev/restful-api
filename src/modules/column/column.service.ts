import { BadRequestException, Injectable } from '@nestjs/common';
import { ColumnRepository } from './column.repository';
import {
  ICreateColumn,
  IDeleteColumn,
  IFindColumn,
  IGetColumn,
} from './models/column.models';
import { ColumnEntity } from './entities/column.entity';
import { UserService } from '../user/user.service';
import { COLUMN_NOT_FOUND } from './column.exceptions';
import { IUser } from '../user/models/user.models';

@Injectable()
export class ColumnService {
  private readonly columnRepository: ColumnRepository;
  private readonly userService: UserService;

  constructor(columnRepository: ColumnRepository, userService: UserService) {
    this.columnRepository = columnRepository;
    this.userService = userService;
  }

  async create(
    authorizedUser: IUser,
    payload: ICreateColumn,
  ): Promise<ColumnEntity> {
    const user = await this.userService.get({
      id: authorizedUser.id,
    });

    const column = new ColumnEntity();

    column.user = user;
    column.example_data = payload.example_data;

    return await this.columnRepository.save(column);
  }

  async get(payload: IGetColumn): Promise<ColumnEntity> {
    const column = await this.columnRepository.get(payload);

    if (!column) {
      throw new BadRequestException(COLUMN_NOT_FOUND);
    }

    return column;
  }

  async find(query: IFindColumn): Promise<Array<ColumnEntity>> {
    const columns = await this.columnRepository.find(query);

    return columns;
  }

  async update(payload): Promise<ColumnEntity> {
    const column = await this.get({
      id: payload.id,
    });

    column.example_data = payload.example_data;

    return await this.columnRepository.save(payload);
  }

  async checkAccess({
    user_id,
    column_id,
  }: {
    user_id: number;
    column_id: number;
  }): Promise<boolean> {
    const column = await this.get({
      id: column_id,
    });

    return column.user.id === user_id;
  }

  async delete(payload: IDeleteColumn): Promise<void> {
    const column = await this.get({
      id: payload.id,
    });

    await this.columnRepository.delete(column);
  }
}
