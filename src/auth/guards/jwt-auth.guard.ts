import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
// AuthGuardは、リクエストが有効なJWTトークンを持っているかどうかを検証し、認証が成功した場合にリクエストを処理