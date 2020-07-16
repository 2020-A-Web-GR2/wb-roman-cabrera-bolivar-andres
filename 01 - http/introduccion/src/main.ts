import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Import module in TS
const cookieParser = require('cookie-parser'); //Import module in TS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Write config here, before app.listen()
   * */
  app.use(cookieParser('mySecret'))
  await app.listen(3001);
}
bootstrap();
