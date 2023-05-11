import { ItemStatus } from 'src/items/item-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // RDBのテーブルと対応するオブジェクト
export class Item {
  @PrimaryGeneratedColumn("uuid") // 主キーであり、自動生成のカラム
  id: string;

  @Column() // 通常のカラム
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}