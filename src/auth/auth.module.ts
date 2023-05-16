import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "secretKey123",
      signOptions: {
        // 3600秒 = 1時間
        expiresIn: 3600
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  // 外部のモジュールにエクスポートしたいものを記述
  exports: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule { }
