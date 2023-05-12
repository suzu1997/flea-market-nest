import { IsString, IsNotEmpty, MaxLength, MinLength, IsEnum } from 'class-validator';
import { UserStatus } from 'src/auth/user-status.enum';

export class CreateUserDto {
  @IsString() // string型
  @IsNotEmpty() // 必須
  username: string;

  @IsString() // string型
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}