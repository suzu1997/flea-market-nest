module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  // Entitiyを作成するごとにTypeORMの設定に追加する必要がなくなる
  autoLoadEntities: true,
  // migrationのファイル作成時、どのentityの情報を読み込むか
  // コンパイル済みのjsファイルを指定する(dist内)
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  // ファイルが生成されるときの出力先
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations"
  }
};
