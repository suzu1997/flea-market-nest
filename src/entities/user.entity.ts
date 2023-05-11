import type { UserStatus } from 'src/auth/user-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // RDBのテーブルと対応するオブジェクト
export class User {
  @PrimaryGeneratedColumn("uuid") // 主キーであり、自動生成のカラム
  id: string;

  @Column({ unique: true }) // ユニーク制約
  username: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;
}