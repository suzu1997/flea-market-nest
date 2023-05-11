import { Injectable, NotFoundException } from '@nestjs/common';
import type { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from 'src/items/item.repository';
import { ItemStatus } from 'src/items/item-status.enum';

@Injectable()
export class ItemsService {
  // (DI)
  constructor(private readonly itemRepository: ItemRepository) { }
  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }
  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id)
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto);
  }
  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    const updatedItem = {
      ...item,
      status: ItemStatus.SOLD_OUT,
      updatedAt: new Date().toISOString()
    }
    await this.itemRepository.save(updatedItem)
    return updatedItem;
  }
  async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id)
  }
}
