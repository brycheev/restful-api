import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './src/modules/user/entities/user.entity';
import { ColumnEntity } from './src/modules/column/entities/column.entity';
import { CardEntity } from './src/modules/card/entities/card.entity';
import { CommentEntity } from './src/modules/comment/entities/comment.entity';

config({ path: '.env' });

const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [UserEntity, ColumnEntity, CardEntity, CommentEntity],
  synchronize: false,
  migrationsRun: false,
  migrations: [`src/db/migrations/*`],
});
