import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

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
  let itemRepository: jest.Mocked<Repository<Item>>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();

    // moduleから、インスタンス化したItemsServiceとItemRepositoryを受け取る
    itemsService = module.get<ItemsService>(ItemsService) as jest.Mocked<ItemsService>;
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item)) as jest.Mocked<Repository<Item>>;
  });

  describe("findAll", () => {
    it('正常系', async () => {
      const expected: Item[] = [];
      jest
        .spyOn(itemRepository, 'find')
        .mockImplementation(async () => expected);
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
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockImplementation(async () => expected);
      const result = await itemsService.findById("testId");
      expect(result).toEqual(expected);
    });
    it('異常系: 商品が存在しない', async () => {
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockImplementation(async () => null);
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
      jest
        .spyOn(itemRepository, 'create')
        .mockReturnValue(expected);
      jest.spyOn(itemRepository, 'save').mockResolvedValue(expected);
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
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockImplementation(async () => mockItem);
      const spy = jest
        .spyOn(itemRepository, 'update')
        .mockResolvedValue({} as UpdateResult);
      await itemsService.updateStatus('test-id', mockUser2);
      expect(spy).toHaveBeenCalled();
    });
    it('異常系: 自身の商品を購入', async () => {
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockImplementation(async () => mockItem);
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
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockImplementation(async () => mockItem);

      const spy = jest
        .spyOn(itemRepository, 'delete')
        .mockResolvedValue({} as DeleteResult);
      await itemsService.delete("testId", mockUser1);
      // itemRepositoryのsaveメソッドが正常に呼び出されたかどうか(呼び出されたら成功)
      expect(spy).toHaveBeenCalled();
    });
    it('異常系: 他人の商品を削除', async () => {
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockImplementation(async () => mockItem);
      await expect(itemsService.delete("testId", mockUser2)).rejects.toThrow(BadRequestException);
    });
  });
});