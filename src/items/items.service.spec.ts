import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { ItemRepository } from './item.repository';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// ItemRepositoryのモック
const mockItemRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createItem: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockUser1 = {
  id: "1",
  username: "test",
  password: "1234",
  status: UserStatus.PREMIUM,
  items: []
};

const mockUser2 = {
  id: "2",
  username: "test2",
  password: "1234",
  status: UserStatus.FREE,
  items: []
};

describe('ItemServiceTest', () => {
  let itemsService: jest.Mocked<ItemsService>;
  let itemRepository: jest.Mocked<ItemRepository>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ItemsService, {
        provide: ItemRepository,
        useFactory: mockItemRepository
      }]
    }).compile();
    // moduleから、インスタンス化したItemsServiceとItemRepositoryを受け取る
    itemsService = module.get<ItemsService>(ItemsService) as jest.Mocked<ItemsService>;
    itemRepository = module.get<ItemRepository>(ItemRepository) as jest.Mocked<ItemRepository>;
  });

  describe("findAll", () => {
    it('正常系', async () => {
      const expected = [];
      itemRepository.find.mockResolvedValue(expected);
      const result = await itemsService.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe("findById", () => {
    it('正常系', async () => {
      const expected: Item = {
        id: "testId",
        name: "PC",
        price: 50000,
        description: "",
        status: ItemStatus.ON_SALE,
        createdAt: "",
        updatedAt: "",
        userId: mockUser1.id,
        user: mockUser1
      };
      itemRepository.findOne.mockResolvedValue(expected);
      const result = await itemsService.findById("testId");
      expect(result).toEqual(expected);
    });
    it('異常系: 商品が存在しない', async () => {
      itemRepository.findOne.mockResolvedValue(null);
      await expect(itemsService.findById("testId")).rejects.toThrow(NotFoundException);
    });
  });

  describe("create", () => {
    it('正常系', async () => {
      const expected: Item = {
        id: "testId",
        name: "PC",
        price: 50000,
        description: "",
        status: ItemStatus.ON_SALE,
        createdAt: "",
        updatedAt: "",
        userId: mockUser1.id,
        user: mockUser1
      };
      itemRepository.createItem.mockResolvedValue(expected);
      const result = await itemsService.create({
        name: "PC",
        price: 50000,
        description: ""
      }, mockUser1);
      expect(result).toEqual(expected);
    });
  });

  describe("updateStatus", () => {
    const mockItem: Item = {
      id: "testId",
      name: "PC",
      price: 50000,
      description: "",
      status: ItemStatus.ON_SALE,
      createdAt: "",
      updatedAt: "",
      userId: mockUser1.id,
      user: mockUser1
    };
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.updateStatus("testId", mockUser2);
      // itemRepositoryのsaveメソッドが正常に呼び出されたかどうか(呼び出されたら成功)
      expect(itemRepository.save).toHaveBeenCalled();
    });
    it('異常系: 自身の商品を購入', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(itemsService.updateStatus("testId", mockUser1)).rejects.toThrow(BadRequestException);
    });
  });

  describe("delete", () => {
    const mockItem: Item = {
      id: "testId",
      name: "PC",
      price: 50000,
      description: "",
      status: ItemStatus.ON_SALE,
      createdAt: "",
      updatedAt: "",
      userId: mockUser1.id,
      user: mockUser1
    };
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.delete("testId", mockUser1);
      // itemRepositoryのsaveメソッドが正常に呼び出されたかどうか(呼び出されたら成功)
      expect(itemRepository.delete).toHaveBeenCalled();
    });
    it('異常系: 他人の商品を削除', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(itemsService.delete("testId", mockUser2)).rejects.toThrow(BadRequestException);
    });
  });
});