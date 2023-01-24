/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery,Model } from "mongoose";
import { service, serviceDocument } from './schemas/service.schema';

@Injectable()
export class ServicesRepository {
    constructor(@InjectModel(service.name) private serviceModel: Model<serviceDocument>){}
    //Trouver Des services
    async find(servicesFilterQuery: FilterQuery<service>): Promise<service[]> {
        return this.serviceModel.find(servicesFilterQuery);
    }
    //Trouver Une Seul Service
    async findOne(serviceFilterQuery: FilterQuery<service>): Promise<service> {
        return this.serviceModel.findOne(serviceFilterQuery);   
    }
    //Cree Une Service
    async create(service: service): Promise<service> {
        const newService = new this.serviceModel(service);
        return newService.save();
    }
    //Modifier Une Service
    async update(serviceFilterQuery:FilterQuery<service>,service: Partial<service>): Promise<service>{
        return this.serviceModel.findOneAndUpdate(serviceFilterQuery,service, {new: true});
    }
    //Supprimer Une Service
    async delete(serviceFilterQuery: FilterQuery<service>) {
        return this.serviceModel.deleteOne(serviceFilterQuery);
    }

}