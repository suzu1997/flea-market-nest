import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import type { User } from '../entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }
  async signIn(credentialsDto: CredentialsDto): Promise<{
    accessToken: string;
  }> {
    const { username, password } = credentialsDto;
    // usernameでユーザーを検索
    const user = await this.userRepository.findOne({ username });

    // bcrypt.compare(password, user.password)で、平文のパスワードとハッシュ化されたパスワードの比較
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: username };
      // 署名されたTokenを作成
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    // 認証に失敗した場合のエラー
    throw new UnauthorizedException('ユーザー名またはパスワードを確認してください');
  }
}
