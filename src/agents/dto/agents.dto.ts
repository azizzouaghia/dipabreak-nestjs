/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean,IsOptional,IsEmail } from 'class-validator';

export class createAgentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    phone: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}

export class updateAgentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    phone?: number;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;

    @IsOptional()
    @IsBoolean()
    status?: boolean;
}