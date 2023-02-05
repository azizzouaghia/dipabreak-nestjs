/* eslint-disable prettier/prettier */
import {IsNumber,IsPositive,IsString,IsNotEmpty,IsBoolean} from 'class-validator'
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { agentSchema,agent } from 'src/agents/schemas/agent.schema';
import { Type } from 'class-transformer';

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

    @Prop({type: [agentSchema], default: []})
    @Type(() => agent)
    agents: agent[]=[]

}

export const serviceSchema = SchemaFactory.createForClass(service);