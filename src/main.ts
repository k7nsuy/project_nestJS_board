import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import 'dotenv/config'

const SERVER_PORT = process.env.SERVER_PORT

async function mainServer() {
  const app = await NestFactory.create(AppModule);

  // 개발 환경에서만 로그 미들웨어를 적용
  if (process.env.NODE_ENV === 'development') {
    app.use(new LoggerMiddleware().use);
  }

  // 개발 환경 확인
  if (process.env.NODE_ENV === 'development') {
    console.log('현재 개발 환경입니다.');
  } else if (process.env.NODE_ENV === 'production') {
    console.log('현재 프로덕션 환경입니다.');
  } else {
    console.log('환경이 설정되지 않았습니다.');
  }

  await app.listen(SERVER_PORT);
}
mainServer();
