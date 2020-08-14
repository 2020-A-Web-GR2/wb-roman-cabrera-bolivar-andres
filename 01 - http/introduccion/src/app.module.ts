import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaEntity} from "./mascota/mascota.entity";


@Module({
  imports: [
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule.forRoot({
          name: 'default', //connection name
          type: 'mysql', //mysql, postgres, oracle, etc
          host: 'localhost', //ip
          port: 3306, //port db
          username: 'root', //user
          password: '', //password
          database: 'test', //database name
          entities: [
              UsuarioEntity,
              VacunaEntity,
              MascotaEntity
          ], //describe all entities to connect
          synchronize: true, //update database schema
          dropSchema: false, //delete data and database schema
      })
  ],
  controllers: [
      //App module controller
      AppController],
  providers: [
      //App module services
      AppService],
})
export class AppModule {}
