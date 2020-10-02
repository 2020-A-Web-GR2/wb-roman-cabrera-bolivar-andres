import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Import module in TS
const cookieParser = require('cookie-parser'); //Import module in TS
const express = require('express')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /**
   * Write config here, before app.listen()
   * */
  app.use(cookieParser('mySecret'))
  app.set('view engine', 'ejs')
  app.use(express.static('public'))
  app.use(
      session({
        name : 'server-session-id',
        secret : 'No sera de tomar un traguito',
        resave : true,
        saveUninitialized : true,
        cookie : {secure : false},
        store : new FileStore(),
      }),
  );
  await app.listen(3001);

}

bootstrap();
