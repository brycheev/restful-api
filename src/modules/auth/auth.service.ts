import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ILoginUser, IUser } from '../user/models/user.models';
import {
  ILogin,
  ILoginResponse,
  TValidateResponse,
} from './models/auth.models';
@Injectable()
export class AuthService {
  private readonly userService: UserService;
  private readonly jwtService: JwtService;

  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async validateUser(email: string, pass: string): Promise<TValidateResponse> {
    const user: IUser = await this.userService.get({
      email,
    });

    if (!user) return null;
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: ILoginUser): Promise<ILoginResponse> {
    const payload = { id: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(payload: ILogin): Promise<ILoginResponse> {
    payload.password = await bcrypt.hash(payload.password, 10);

    const user = await this.userService.create(payload);

    return this.login({
      id: user.id,
      email: user.email,
    });
  }
}
