# blog api를 만들어 보자 🧐

<br>

## 1.필요한 패키지 설치

```bash
npm install @nestjs/config  @nestjs/typeorm typeorm class-transformer class-validator pg
```

- `@nestjs/config`: 환경 변수를 관리하기 위한 패키지
- `@nestjs/typeorm` : Nest.js에서 TypeORM을 사용할 수 있도록 지원하는 패키지로 데이터베이스와 상호 작용할 수 있게 해준다.
- `typeorm` : TypeORM 라이브러리 자체를 나타낸다. @nestjs/typeorm와 같이 설치해야 Nest에서 TypeORM을 사용할 수 있다.
- `class-transformer`: 엔티티/DTO 클래스에 표현한 규칙을 적용할 수 있게 해주는 패키지
- `class-validator`: 객체의 유효성 검사를 수행하는 데 사용되는 패키지
- `pg` : PostgreSQL 데이터베이스에 연결하고 상호 작용하기 위한 공식 드라이버로 PostgreSQL 데이터베이스와 통신할 때 사용한다.

<br>

## 2. 데이터베이스 연결

### 2.1 환경변수 설정

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 불러옴
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 환경변수 전역으로 사용
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

먼저 app.module.ts파일에서 환경변수 전역으로 사용할 수 있게 ConfigModule모듈에 isGlobal옵션을 true로 적용하자.
그 다음 .env파일에서 다음과 같이 정의한다.

```
// .env
PORT = 애플리케이션에서 사용하는 포트 번호
DATABASE_PORT = 데이터베이스 서버에 연결하기 위한 포트 번호
DATABASE_USER = 데이터베이스에 접속할 때 사용되는 사용자 이름
DATABASE_HOST =  데이터베이스 서버의 호스트 주소
DATABASE_PASSWORD= 데이터베이스에 접속할 때 사용되는 비밀번호
DATABASE_DB = 데이터베이스 이름
```

이제 db-connection.service.ts 파일을 따로 만들어서 다음과 같이 설정하자.

### 2.2 데이터베이스 연결 옵션 설정

```ts
// db-connection.service.ts

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable() // 다른 모듈에 주입하기 위해 주입 가능한 클래스로 만듦
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // TypeORM 연결 옵션 구성
    return {
      type: 'postgres', //사용할 데이터베이스 유형
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true, //애플리케이션 엔티티와 데이터베이스 스키마 자동 동기화 여부
      dropSchema: false, //데이터베이스 스키마 초기화 여부
      logging: true, //로그 출력 여부
      entities: ['dist/**/*.entity.js'],
    };
  }
}
```

먼저 `DatabaseConnectionService`클래스를 module에서 TypeOrmModule에 주입하기 위해 `@Injectable()` 데코레이터를 사용하여 주입 가능한 클래스로 만든다.
`DatabaseConnectionService` 클래스가 `TypeOrmOptionsFactory` 인터페이스의 모든 메서드를 구현해 TypeORM 모듈의 설정을 제공한다. 이 설정은
`createTypeOrmOptions` 메서드 내에서 TypeORM 연결 옵션을 구성하고 TypeOrmModuleOptions형식으로 반환해야 한다.

<br>

```ts
export class DatabaseConnectionService implements TypeOrmOptionsFactory {}
```

`DatabaseConnectionService` 클래스는 `TypeOrmOptionsFactory` 인터페이스의 모든 메서드를 구현해 TypeORM 모듈의 설정을 제공한다.

<br>

```ts
createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // TypeORM 연결 옵션 구성
    };
  }
```

모듈의 설정은 `createTypeOrmOptions` 메서드 내에서 TypeORM 연결 옵션을 구성하고 `TypeOrmModuleOptions` 형식으로 반환해야 한다.

### 2.3 데이터베이스 연결 설정

마지막으로 `DatabaseConnectionService` 클래스를 app.module.ts 파일에서 아래와 같이 연결해주면 된다.

```ts
// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 불러옴
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './db-connection.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // 데이터베이스 연결 설정
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

TypeOrmModule.forRootAsync() 메소드를 사용하여 데이터베이스 연결해주자. 이때 useClass 옵션을 사용해 `DatabaseConnectionService` 클래스를 지정해주면 데이터베이스 연결이 완료된다~~!🚀🚀

- `forRoot` : 동기적으로 모듈 설정(환경 변수나 설정 값)
- `forRootAsync` : 비동기적으로 설정(데이터베이스,서비스)
