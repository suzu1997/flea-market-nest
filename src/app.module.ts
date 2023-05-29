import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
// import { DataSource } from 'typeorm';

@Module({
  imports: [ItemsModule, AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    // Entitiyを作成するごとにTypeORMの設定に追加する必要がなくなる
    autoLoadEntities: true,
  })],
  controllers: [],
  providers: [],
})

export class AppModule {
  // constructor(private dataSource: DataSource) { }
}

