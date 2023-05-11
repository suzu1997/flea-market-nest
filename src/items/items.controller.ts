import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import type { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  // ItemsServiceクラスをインスタンス化し、変数に代入(DI)
  constructor(private readonly itemsService: ItemsService) { }
  @Get()
  async findAll(): Promise<Item[]> {
    // ServiceクラスのfindAllメソッドを使用
    return await this.itemsService.findAll();
  }

  @Get(':id') // /items/:id 引数名の前に:(コロン)で、可変なパラメータ
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.updateStatus(id);
  }

  @Delete(':id') // /items/:id
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.itemsService.delete(id);
  }
}