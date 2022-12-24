import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './configs/postgres.config';
import { ColumnModule } from './modules/column/column.module';
import { CardModule } from './modules/card/card.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: PostgresConfig,
    }),
    ColumnModule,
    CardModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
