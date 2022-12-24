import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtUser } from '../../modules/user/models/user.models';
import { CommentService } from '../../modules/comment/comment.service';

@Injectable()
export class CommentGuard implements CanActivate {
  private readonly jwtService: JwtService;
  private readonly commentService: CommentService;

  constructor(
    @Inject(JwtService)
    jwtService: JwtService,
    commentService: CommentService,
  ) {
    this.jwtService = jwtService;
    this.commentService = commentService;
  }
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtService.decode(token) as IJwtUser;
    const body = request.body;

    const doesHaveAccess = await this.commentService.checkAccess({
      user_id: decodedToken.id,
      comment_id: body.id,
    });

    return doesHaveAccess;
  }
}
