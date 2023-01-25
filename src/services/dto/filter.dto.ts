/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterDto {

    @Type(() => Number)
    @IsNumber()
    first: number;

    @Type(() => Number)
    @IsNumber()
    rows: number;

    @Type(() => Object)
    name: { value: string; matchMode: string };

    @Type(() => Object)
    description: { value: string; matchMode: string };

    @Type(() => Object)
    price: { value: string; matchMode: string };

    @Type(() => Object)
    dateCreated: { value: string; matchMode: string };
}
