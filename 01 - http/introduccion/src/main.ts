import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Import module in TS
const cookieParser = require('cookie-parser'); //Import module in TS
const express = require('express')

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /**
   * Write config here, before app.listen()
   * */
  app.use(cookieParser('mySecret'))
  await app.listen(3001);
  app.set('view engine', 'ejs')
  app.use(express.static('public'))

}

bootstrap();
