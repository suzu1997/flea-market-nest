import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      // JWTをリクエストのAuthorizationヘッダーからBearerトークンとして抽出
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWTの有効期限のチェックを有効に
      ignoreExpiration: false,
      // JWTの署名に使用される秘密鍵を指定
      secretOrKey: "secretKey123"
    });
  }

  // 処理の中で自動的に呼ばれるメソッドで、名前はvalidateである必要がある
  async validate(payload: { id: string, username: string; }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findOne({ id, username });

    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}