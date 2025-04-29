import { IsOptional, Min, IsPositive, IsNumber } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    //puede empezar en cero porque 0 serían los primeros registros los que devuelva
    offset?: number;
}