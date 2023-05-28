import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from '../items/item.repository';
import { ItemStatus } from '../items/item-status.enum';
import { User } from '../entities/user.entity';

@Injectable()
export class ItemsService {
  // (DI)
  constructor(private readonly itemRepository: ItemRepository) { }
  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }
  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }
  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException("自身の商品を購入することはできません。");
    }
    const updatedItem = {
      ...item,
      status: ItemStatus.SOLD_OUT,
      updatedAt: new Date().toISOString()
    };
    await this.itemRepository.save(updatedItem);
    return updatedItem;
  }
  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException("他人の商品を削除することはできません。");
    }
    await this.itemRepository.delete(id);
  }
}
