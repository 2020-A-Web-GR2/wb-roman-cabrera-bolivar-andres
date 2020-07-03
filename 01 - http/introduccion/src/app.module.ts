import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      //Here other modules
  ],
  controllers: [
      //App module controller
      AppController],
  providers: [
      //App module services
      AppService],
})
export class AppModule {}
