/* eslint-disable prettier/prettier */
import {IsNumber,IsString,IsNotEmpty} from 'class-validator'
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type interventionDocument = intervention & Document;
@Schema()
export class intervention {

    @IsString()
    @IsNotEmpty()
    @Prop()
    intId:string;

    @IsString()
    @IsNotEmpty()
    @Prop()
    email:string;


    @IsNotEmpty()
    @Prop()
    phone:number;

    @IsString()
    @IsNotEmpty()
    @Prop()
    service:string;

    @IsNumber()
    @IsNotEmpty()
    @Prop()
    latitude:number;

    @IsNumber()
    @IsNotEmpty()
    @Prop()
    longitude:number;

    @IsNumber()
    @IsNotEmpty()
    @Prop({default:0})
    status:number

    @Prop({ default: Date.now })
    createdDate:Date

}

export const interventionSchema = SchemaFactory.createForClass(intervention);