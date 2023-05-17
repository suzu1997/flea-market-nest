import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * リクエストからユーザー情報を取得するためのカスタムデコレーター
 * @param _ - 未使用のパラメータ。
 * @param ctx - リクエストオブジェクトを含む ExecutionContext。
 * @returns リクエストから抽出されたユーザーオブジェクト。
 */
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});