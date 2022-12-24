import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ColumnService } from '../../modules/column/column.service';
import { IJwtUser } from '../../modules/user/models/user.models';

@Injectable()
export class ColumnGuard implements CanActivate {
  private readonly jwtService: JwtService;
  private readonly columnService: ColumnService;

  constructor(
    @Inject(JwtService)
    jwtService: JwtService,
    columnService: ColumnService,
  ) {
    this.jwtService = jwtService;
    this.columnService = columnService;
  }
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtService.decode(token) as IJwtUser;
    const body = request.body;

    const doesHaveAccess = await this.columnService.checkAccess({
      user_id: decodedToken.id,
      column_id: body.id,
    });

    return doesHaveAccess;
  }
}
