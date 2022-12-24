import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { UserEntity } from '../modules/user/entities/user.entity';
import { ColumnEntity } from '../modules/column/entities/column.entity';
import { CardEntity } from '../modules/card/entities/card.entity';
import { CommentEntity } from '../modules/comment/entities/comment.entity';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;
  private readonly database: string;

  constructor(configService: ConfigService) {
    this.host = configService.getString('POSTGRES_HOST');
    this.port = configService.getNumber('POSTGRES_PORT');
    this.username = configService.getString('POSTGRES_USERNAME');
    this.password = configService.getString('POSTGRES_PASSWORD');
    this.database = configService.getString('POSTGRES_DATABASE');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: [UserEntity, ColumnEntity, CardEntity, CommentEntity],
      synchronize: false,
      migrations: ['dist/src/db/migrations/*'],
      migrationsRun: false,
    };
  }
}
