/* eslint-disable prettier/prettier */
import {IsNumber,IsString,IsNotEmpty,IsBoolean} from 'class-validator'
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { service,serviceSchema } from 'src/services/schemas/service.schema';
import { Type } from 'class-transformer';

export type agentDocument = agent & Document;
@Schema()
export class agent {

    @IsString()
    @IsNotEmpty()
    @Prop()
    agentId:string;

    @IsString()
    @IsNotEmpty()
    @Prop()
    name:string;

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
    password:string;

    @IsNumber()
    @IsNotEmpty()
    @Prop()
    latitude:number;

    @IsNumber()
    @IsNotEmpty()
    @Prop()
    longitude:number;

    @IsBoolean()
    @IsNotEmpty()
    @Prop()
    status:boolean

    @Prop({ default: Date.now })
    createdDate:Date

    @Prop({type: [serviceSchema], default: []})
    @Type(() => service)
    services: service[] = [];

}

export const agentSchema = SchemaFactory.createForClass(agent);