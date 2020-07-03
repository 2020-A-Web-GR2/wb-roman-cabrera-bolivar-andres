import {Module} from "@nestjs/common";
import {HttpGameController} from "./http-game.controller";

@Module({
    imports:[],
    controllers: [
        HttpGameController
    ],
    providers: [],
})

export class HttpGameModule{
}