/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery,Model } from "mongoose";
import { agent, agentDocument } from './schemas/agent.schema';

@Injectable()
export class AgentsRepository {
    constructor(
        @InjectModel(agent.name) private agentModel: Model<agentDocument>,
    ) {}
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
    async update(
        agentFilterQuery: FilterQuery<agent>,
        agent: Partial<agent>,
    ): Promise<agent> {
        return this.agentModel.findOneAndUpdate(agentFilterQuery, agent, {new: true,});
    }
    //Supprimer Une Agent
    async delete(agentFilterQuery: FilterQuery<agent>) {
        return this.agentModel.deleteOne(agentFilterQuery);
    }

    //Ajouter Une Service A Un Agent
    async addServiceToAgent(agentId: string, serviceId: string) {
        return this.agentModel.updateOne(
            { agentId: agentId },
            { $addToSet: { services: serviceId }}
        );
    }

    //Filter & Pagination
    async getCustomAgents(
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
        return this.agentModel.find(filter).skip(first).limit(rows);
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
        return this.agentModel.find(filter).count();
}

}