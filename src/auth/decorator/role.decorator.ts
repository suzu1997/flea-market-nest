import { SetMetadata } from '@nestjs/common';

// 引数には、デコレータに渡した値が入る
// 今回は、認可したいステータスを与える
export const Role = (...statuses: string[]) =>
  // デコレータに渡された値を、メタデータとしてキー/バリューの形で格納することができる
  // ⇨ メタデータをガードの中で使用し、認可処理を行う。
  SetMetadata("statuses", statuses);