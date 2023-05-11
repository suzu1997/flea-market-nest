import { Item } from 'src/entities/item.entity';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { ItemStatus } from 'src/items/item-status.enum';
import { EntityRepository, Repository } from 'typeorm';

// 引数に、扱いたいentityのクラスを渡す
@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  // DB操作は非同期なので、asyncを付与
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = createItemDto;
    // create メソッドはTypeORMが提供するメソッドで、データベースに保存する前に、
    // エンティティを作成
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    // DBにデータを保存するには、Repositoryクラスのsaveメソッドを使用
    await this.save(item)

    return item
  }
}