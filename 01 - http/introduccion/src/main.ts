import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Write config here, before app.listen()
   * */
  await app.listen(3001);
}
bootstrap();
