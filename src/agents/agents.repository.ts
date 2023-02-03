/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery,Model } from "mongoose";
import { agent, agentDocument } from './schemas/agent.schema';

@Injectable()
export class AgentsRepository {
    constructor(@InjectModel(agent.name) private agentModel: Model<agentDocument>){}
    //Trouver Une Seul Agent
    async findOne(agentFilterQuery: FilterQuery<agent>): Promise<agent> {
        return this.agentModel.findOne(agentFilterQuery);   
    }
    //Cree Une Agent
    async create(agent: agent): Promise<agent> {
        const newAgent = new this.agentModel(agent);
        return newAgent.save();
    }
    //Modifier Une Agent
    async update(agentFilterQuery:FilterQuery<agent>,agent: Partial<agent>): Promise<agent>{
        return this.agentModel.findOneAndUpdate(agentFilterQuery,agent, {new: true});
    }
    //Supprimer Une Agent
    async delete(agentFilterQuery: FilterQuery<agent>) {
        return this.agentModel.deleteOne(agentFilterQuery);
    }
    //Filter & Pagination
    async getCustomAgents(first:number,rows:number,filterValue:any,filterMatchMode:string,selectedValue:string) {
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
                filter[selectedValue] = { $eq: filterValue };
            }else if (filterMatchMode=="Not Equal"){
                filter[selectedValue] = {$ne : filterValue}
            }else if (filterMatchMode=="Filter"){
                filter['createdDate'] = {$gte: filterValue.start,$lte: filterValue.end,};
            }
            return this.agentModel.find(filter).skip(first).limit(rows);
    }

    async getCustomLength(filterValue:any,filterMatchMode:string,selectedValue:string) {
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
                filter[selectedValue] = { $eq: filterValue };
            }else if (filterMatchMode=="Not Equal"){
                filter[selectedValue] = {$ne : filterValue}
            }else if (filterMatchMode=="Filter"){
                filter['createdDate'] = {$gte: filterValue.start,$lte: filterValue.end,};
            }
            return this.agentModel.find(filter).count();
        }
}