import type { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

// 引数に、扱いたいentityのクラスを渡す
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // DB操作は非同期なので、asyncを付与
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    // create メソッドはTypeORMが提供するメソッドで、データベースに保存する前に、
    // エンティティを作成
    const user = this.create({
      username,
      password,
      status
    })
    // DBにデータを保存するには、Repositoryクラスのsaveメソッドを使用
    await this.save(user)

    return user
  }
}