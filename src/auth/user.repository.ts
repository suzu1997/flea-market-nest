import type { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

// 引数に、扱いたいentityのクラスを渡す
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // DB操作は非同期なので、asyncを付与
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    // salt ... ハッシュ値の強度を高めるための文字列
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    // create メソッドはTypeORMが提供するメソッドで、データベースに保存する前に、
    // エンティティを作成
    const user = this.create({
      username,
      password: hashPassword,
      status
    })
    // DBにデータを保存するには、Repositoryクラスのsaveメソッドを使用
    await this.save(user)

    return user
  }
}