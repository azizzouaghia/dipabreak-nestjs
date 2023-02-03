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
    async getCustomServices(
        first: number,
        rows: number,
        filterValue: any,
        filterMatchMode: string,
        selectedValue: string[],
    ) {
    const filter = {};
    selectedValue.forEach((value) => {
        if (filterMatchMode[value] === 'Start with') {
            filter[value] = { $regex: `^${filterValue[value]}`, $options: 'i' };
        } else if (filterMatchMode[value] === 'Contains') {
            filter[value] = { $regex: `${filterValue[value]}`, $options: 'i' };
        } else if (filterMatchMode[value] === 'Not Contains') {
            filter[value] = { $not: new RegExp(filterValue[value], 'i') };
        } else if (filterMatchMode[value] === 'Ends with') {
            filter[value] = { $regex: `.*${filterValue[value]}$`, $options: 'i' };
        } else if (filterMatchMode[value] === 'Equal') {
            filter[value] = { $eq: filterValue[value] };
        } else if (filterMatchMode[value] === 'Not Equal') {
            filter[value] = { $ne: filterValue[value] };
        } else if (filterMatchMode[value] === 'Filter') {
            filter['createdDate'] = {$gte: filterValue[value].start,$lte: filterValue[value].end,};
        }
    }); 
        return this.serviceModel.find(filter).skip(first).limit(rows);
    }

    async getCustomLength(
        filterValue: any,
        filterMatchMode: string,
        selectedValue: string[],
    ) {
    const filter = {};
    selectedValue.forEach((value) => {
        if (filterMatchMode[value] === 'Start with') {
            filter[value] = { $regex: `^${filterValue[value]}`, $options: 'i' };
        } else if (filterMatchMode[value] === 'Contains') {
            filter[value] = { $regex: `${filterValue[value]}`, $options: 'i' };
        } else if (filterMatchMode[value] === 'Not Contains') {
            filter[value] = { $not: new RegExp(filterValue[value], 'i') };
        } else if (filterMatchMode[value] === 'Ends with') {
            filter[value] = { $regex: `.*${filterValue[value]}$`, $options: 'i' };
        } else if (filterMatchMode[value] === 'Equal') {
            filter[value] = { $eq: filterValue[value] };
        } else if (filterMatchMode[value] === 'Not Equal') {
            filter[value] = { $ne: filterValue[value] };
        } else if (filterMatchMode[value] === 'Filter') {
            filter['createdDate'] = {$gte: filterValue[value].start,$lte: filterValue[value].end,};
        }
    }); 
        return this.serviceModel.find(filter).count();
}
}