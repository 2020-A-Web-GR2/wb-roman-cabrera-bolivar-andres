import {Module} from "@nestjs/common";
import {CalcController} from "./calc.controller";

@Module({
    imports : [],
    controllers : [
        CalcController ],
    providers : [],
})

export class CalcModule{

}