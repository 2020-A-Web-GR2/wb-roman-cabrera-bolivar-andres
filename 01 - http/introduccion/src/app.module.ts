import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpGameModule} from "./http/http-game.module";

@Module({
  imports: [
      HttpGameModule
  ],
  controllers: [
      //App module controller
      AppController],
  providers: [
      //App module services
      AppService],
})
export class AppModule {}
