import {IsDateString, IsNumberString, IsOptional, IsString} from "class-validator";

export class UniverseUpdateDto{

    @IsOptional()
    @IsString()
    location? : string

    @IsOptional()
    @IsNumberString()
    width? : number

    @IsOptional()
    @IsNumberString()
    height? : number

    @IsOptional()
    @IsDateString()
    dateBorn? : string
}