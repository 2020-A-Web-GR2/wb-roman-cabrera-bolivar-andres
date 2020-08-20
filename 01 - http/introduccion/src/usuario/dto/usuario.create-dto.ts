import {
    IsDateString,
    IsDecimal,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    MaxLength
} from "class-validator";

export class UsuarioCreateDto {

    @IsOptional()
    @MaxLength(60)
    name? : string

    @IsOptional()
    @MaxLength(60)
    lastName? : string

    @IsNotEmpty()
    @IsNumberString()
    @MaxLength(18)
    dni? : string

    @IsOptional()
    @IsNumberString()
    @IsDecimal({'decimal_digits': '0,2'})
    wage ? : string

    @IsOptional()
    @IsDateString()
    dateBorn ? : string

    @IsOptional()
    @IsDateString()
    dateTimeBorn ? : string

}
