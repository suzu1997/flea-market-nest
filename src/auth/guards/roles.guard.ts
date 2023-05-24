import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // ガードを作成するためには、CanActivateを実装

  // DI: Reflectorでメタデータの取得ができる
  constructor(private reflector: Reflector) { }
  canActivate(ctx: ExecutionContext): boolean {
    const requiredStatuses = this.reflector.get<string[]>(
      "statuses", // 取得したいキー名
      ctx.getHandler() // ハンドラのメタデータを取得
    );
    if (!requiredStatuses) return true;
    const { user } = ctx.switchToHttp().getRequest();
    return requiredStatuses.some((status) => user.status.includes(status));
  }
}