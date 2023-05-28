import { ItemStatus } from '../items/item-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

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

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  userId: string;
}