/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean,IsOptional } from 'class-validator';

export class createServiceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}

export class updateServiceDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    clients?: string[];

    @IsOptional()
    agents?: string[];
}