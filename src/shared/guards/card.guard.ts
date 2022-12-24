import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtUser } from '../../modules/user/models/user.models';
import { CardService } from '../../modules/card/card.service';

@Injectable()
export class CardGuard implements CanActivate {
  private readonly jwtService: JwtService;
  private readonly cardService: CardService;

  constructor(
    @Inject(JwtService)
    jwtService: JwtService,
    cardService: CardService,
  ) {
    this.jwtService = jwtService;
    this.cardService = cardService;
  }
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtService.decode(token) as IJwtUser;
    const body = request.body;

    const doesHaveAccess = await this.cardService.checkAccess({
      user_id: decodedToken.id,
      card_id: body.id,
    });

    return doesHaveAccess;
  }
}
