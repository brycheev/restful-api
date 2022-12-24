import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from './config.service';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(configService: ConfigService) {
    this.secret = configService.getString('JWT_SECRET');
    this.expiresIn = configService.getString('JWT_EXPIRES');
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.secret,
      signOptions: {
        expiresIn: this.expiresIn,
      },
    };
  }
}
