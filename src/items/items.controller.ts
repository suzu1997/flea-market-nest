import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import type { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../entities/user.entity';
import { Role } from '../auth/decorator/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserStatus } from '../auth/user-status.enum';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor) // クラス内のメソッドの実行結果が返される前に、シリアライズが自動的に実行(@Expose()や@Exclude()などを適用)
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
  @Role(UserStatus.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createItemDto: CreateItemDto, @GetUser() user: User): Promise<Item> {
    return await this.itemsService.create(createItemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  @Delete(':id') // /items/:id
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User): Promise<void> {
    await this.itemsService.delete(id, user);
  }
}
