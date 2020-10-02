import {IsDateString, IsDecimal, IsNumber, IsNumberString, IsOptional, IsPositive, IsString} from "class-validator";

export class UniverseCreateDto {
    @IsOptional()
    @IsString()
    name? : string

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