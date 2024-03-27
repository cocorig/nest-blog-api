import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable() // 다른 모듈에 주입하기 위해
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres', //사용할 데이터베이스 유형
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    };
  }
}
// TypeOrmOptionsFactory: TypeORM 모듈의 설정을 동적으로 `생성`하기 위한 인터페이스로 createTypeOrmOptions 메서드에 TypeORM 연결 옵션을 넣어서 반환해야 한다.
// createTypeOrmOptions 메서드의 반환 타입으로 TypeOrmModuleOptions 지정한다.
// TypeOrmModuleOptions :  TypeORM 모듈의 `설정 옵션`을 나타내는 인터페이스를 객체로 반환한다.
// https://docs.nestjs.com/recipes/sql-typeorm
// https://docs.nestjs.com/techniques/database
// https://velog.io/@___pepper/Nest.js-TypeORM-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
