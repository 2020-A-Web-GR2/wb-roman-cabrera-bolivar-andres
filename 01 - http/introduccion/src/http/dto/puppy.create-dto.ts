// @IsAlpha()
// @IsNotEmpty()
// @MinLength()
// @MaxLength()
// @IsBoolean()
// @IsEmpty()
// @IsInt()
// @IsPositive()
// @IsOptional()
// @IsNumber()

import {IsAlpha, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, Length, Min} from "class-validator";

export class PuppyCreateDto{

    @IsNotEmpty()
    @IsAlpha()
    @Length(3,20)
    name: string;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    age: number;

    @IsNotEmpty()
    @IsBoolean()
    married: boolean;

    @IsOptional()
    @IsBoolean()
    ligature?: boolean;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

}
