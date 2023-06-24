import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { LoggerMiddleware } from './middlewares/logger.middleware';
const SERVER_PORT = process.env.SERVER_PORT

async function mainServer() {
  const app = await NestFactory.create(AppModule);

  // 개발 환경에서만 로그 미들웨어를 적용
  if (process.env.NODE_ENV === 'development') {
    app.use(LoggerMiddleware);
  }

  await app.listen(SERVER_PORT);
}
mainServer();
