import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { AppConfig } from './app.config';
import { ConfigService } from './config.service';
import { PostgresConfig } from './postgres.config';
import { JwtConfig } from './jwt.config';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    ConfigService,
    AppConfig,
    PostgresConfig,
    JwtConfig,
  ],
  exports: [AppConfig, ConfigService, PostgresConfig, JwtConfig],
})
export class ConfigModule {}
