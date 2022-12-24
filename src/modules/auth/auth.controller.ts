import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../shared/guards/local.guard';
import { ILoginResponse } from './models/auth.models';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() payload: LoginDto, @Req() req): Promise<ILoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() payload: LoginDto): Promise<ILoginResponse> {
    return await this.authService.signup(payload);
  }
}
