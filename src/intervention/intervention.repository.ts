/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery,Model } from "mongoose";
import { intervention, interventionDocument } from './schemas/intervention.schema';

@Injectable()
export class InterventionRepository {
}