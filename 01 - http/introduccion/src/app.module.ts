import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpGameModule} from "./http/http-game.module";
import {UsuarioModule} from "./usuario/usuario.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {CalcModule} from "./calculadora/calc.module";

@Module({
  imports: [
     /* HttpGameModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: '', //connection name
          type: 'mysql', //mysql, postgres, oracle, etc
          host: 'localhost', //ip
          port: 3306, //port db
          username: 'root', //user
          password: 'root', //password
          database: 'test', //database name
          entities: [

          ], //describe all entities to connect
          synchronize: true, //update database schema
          dropSchema: false, //delete data and database schema
      })*/
      CalcModule
  ],
  controllers: [
      //App module controller
      AppController],
  providers: [
      //App module services
      AppService],
})
export class AppModule {}
