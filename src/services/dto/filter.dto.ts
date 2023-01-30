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
    filters: {
        name: { value: string; matchMode: string };
        description: { value: string; matchMode: string };
        price: { value: string; matchMode: string };
        dateCreated: { 
            value: {
                start:Date;
                end:Date
            }; 
            matchMode: string 
        };
    }
}
