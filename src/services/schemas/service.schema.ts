/* eslint-disable prettier/prettier */
import {IsNumber,IsPositive,IsString,IsNotEmpty,IsBoolean} from 'class-validator'
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type serviceDocument = service & Document;

@Schema()
export class service {

    @IsString()
    @IsNotEmpty()
    @Prop()
    serviceId:string;

    @IsString()
    @IsNotEmpty()
    @Prop()
    name:string;

    @IsString()
    @IsNotEmpty()
    @Prop()
    description:string

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Prop()
    price:number

    @IsBoolean()
    @IsNotEmpty()
    @Prop()
    status:boolean

    @Prop({ default: Date.now })
    createdDate:Date

    @Prop([String])
    clients: string[]

    @Prop([String])
    agents: string[]

}

export const serviceSchema = SchemaFactory.createForClass(service);