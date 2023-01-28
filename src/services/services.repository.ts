/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery,Model } from "mongoose";
import { service, serviceDocument } from './schemas/service.schema';

@Injectable()
export class ServicesRepository {
    constructor(@InjectModel(service.name) private serviceModel: Model<serviceDocument>){}
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
    //Filter & Pagination
    async getCustomServices(first:number,rows:number,filterValue:string,filterMatchMode:string,selectedValue:string) {
        const filter = {};
            if(filterMatchMode=="Start with"){
                filter[selectedValue] = { $regex: `^${filterValue}`, $options: "i" } 
            }else if (filterMatchMode=="Contains"){
                filter[selectedValue] = { $regex: `${filterValue}`, $options: "i" } 
            }else if (filterMatchMode=="Not Contains"){
                filter[selectedValue] = { $not: new RegExp(filterValue, "i") } 
            }else if (filterMatchMode=="Ends with"){
                filter[selectedValue] = { $regex: `.*${filterValue}$`, $options: 'i' }; 
            }else if (filterMatchMode=="Equal"){
                filter[selectedValue] = filterValue
            }else if (filterMatchMode=="Not Equal"){
                filter[selectedValue] = {$ne : filterValue}
            }
            return this.serviceModel.find(filter).skip(first).limit(rows);
    }

    async getCustomLength(filterValue:string,filterMatchMode:string,selectedValue:string) {
        const filter = {};
            if(filterMatchMode=="Start with"){
                filter[selectedValue] = { $regex: `^${filterValue}`, $options: "i" } 
            }else if (filterMatchMode=="Contains"){
                filter[selectedValue] = { $regex: `${filterValue}`, $options: "i" } 
            }else if (filterMatchMode=="Not Contains"){
                filter[selectedValue] = { $not: new RegExp(filterValue, "i") } 
            }else if (filterMatchMode=="Ends with"){
                filter[selectedValue] = { $regex: `.*${filterValue}$`, $options: 'i' }; 
            }else if (filterMatchMode=="Equal"){
                filter[selectedValue] = filterValue
            }else if (filterMatchMode=="Not Equal"){
                filter[selectedValue] = {$ne : filterValue}
            }
            return this.serviceModel.find(filter).count();
        }
}