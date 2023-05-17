import type { UserStatus } from 'src/auth/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { Exclude } from 'class-transformer';

@Entity() // RDBのテーブルと対応するオブジェクト
export class User {
  @PrimaryGeneratedColumn("uuid") // 主キーであり、自動生成のカラム
  id: string;

  @Column({ unique: true }) // ユニーク制約
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  status: UserStatus;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}