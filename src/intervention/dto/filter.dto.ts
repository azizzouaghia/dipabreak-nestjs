/* eslint-disable prettier/prettier */
import { IsNumber} from 'class-validator';
import { Type } from 'class-transformer';

export class AgentFilterDto {

    @Type(() => Number)
    @IsNumber()
    first: number;

    @Type(() => Number)
    @IsNumber()
    rows: number;

    @Type(() => Object)
    filters: {
        name: { value: string; matchMode: string };
        email: { value: string; matchMode: string };
        phone: { value: string; matchMode: string };
        latitude: { value: string; matchMode: string };
        longitude: { value: string; matchMode: string };
        status: { value: string; matchMode: string };
        service: { value: string; matchMode: string };
        dateCreated: { 
            value: {
                start:Date;
                end:Date
            }; 
            matchMode: string 
        };
    }
}