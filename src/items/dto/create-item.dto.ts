import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateItemDto {
  @IsString() // string型
  @IsNotEmpty() // 必須
  @MaxLength(40) // 40文字まで許容
  name: string;

  @IsInt()
  @Min(1) //1円以上
  @Type(() => Number) // 文字列として渡ってきたパラメータをNumber型として認識できるようにする
  price: number;

  @IsString() 
  @IsNotEmpty()
  description: string;
}
