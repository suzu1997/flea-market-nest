import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ItemsModule, AuthModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
