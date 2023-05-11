import { IsString, IsNotEmpty, MaxLength, MinLength, IsEnum } from 'class-validator';
import { UserStatus } from 'src/auth/user-status.enum';

export class CreateUserDto {
  @IsString() // string型
  @IsNotEmpty() // 必須
  username: string;

  @IsString() // string型
  @MinLength(8)
  @MaxLength(32)
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
  //   message: 'パスワードは大文字、小文字、数字、特殊文字を含む必要があります。',
  // })
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}