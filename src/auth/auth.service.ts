import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    // DB操作は非同期なので、asyncを付与
    const { username, password, status } = createUserDto;
    // salt ... ハッシュ値の強度を高めるための文字列
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    // create メソッドはTypeORMが提供するメソッドで、データベースに保存する前に、
    // エンティティを作成
    const user = this.userRepository.create({
      username,
      password: hashPassword,
      status
    });
    // DBにデータを保存するには、Repositoryクラスのsaveメソッドを使用
    await this.userRepository.save(user);

    return user;
  }
  
  async signIn(credentialsDto: CredentialsDto): Promise<{
    accessToken: string;
  }> {
    const { username, password } = credentialsDto;
    // usernameでユーザーを検索
    const user = await this.userRepository.findOneBy({ username });

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
