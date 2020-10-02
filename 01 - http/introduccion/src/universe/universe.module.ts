import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UniverseEntity} from "./universe.entity";
import {UniverseService} from "./universe.service";
import {UniverseController} from "./universe.controller";

@Module({
    controllers:[
        UniverseController
    ],
    imports:[
        TypeOrmModule.forFeature(
            [
                UniverseEntity
            ],
            'default'
        )
    ],
    providers:[
        UniverseService
    ]
})
export class UniverseModule{

}