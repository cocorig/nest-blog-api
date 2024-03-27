import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 불러옴
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './db-connection.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 환경변수 전역으로 사용
    // 데이터베이스 연결 설정
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService, //useClass옵션을 사용해 DatabaseConnectionService 클래스를 지정함
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// forRoot : 동기적으로 모듈 설정(환경 변수나 설정 값)
// forRootAsync : 비동기적으로 설정(데이터베이스,서비스)
