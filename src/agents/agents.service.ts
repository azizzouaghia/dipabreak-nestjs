/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AgentsRepository } from './agents.repository';
import { agent } from './schemas/agent.schema';
import { v4 as uuidv4 } from 'uuid';
import { createAgentDto,updateAgentDto } from './dto/agents.dto';

@Injectable()
export class AgentsService {
    constructor(private readonly agentsRepository: AgentsRepository){}
    //Trouver Un Agent Par Id
    async getAgentById(agentId:string): Promise<agent>{
        return this.agentsRepository.findOne({agentId});
    }
    //Cree Un Agent
    async createAgent(agents:createAgentDto): Promise<agent> {
        return this.agentsRepository.create({
            agentId: uuidv4(),
            ...agents,
            createdDate: new Date(),
            services:[]
        })
    }
    //Modifier Un Agent
    async updateAgent(agentId:string,updatedAgent:updateAgentDto): Promise<agent>{
        return this.agentsRepository.update({agentId},updatedAgent);
    }
    //Supprimer Un Agent
    async deleteAgent(agentId:string){
        return this.agentsRepository.delete({agentId});
    }
    //Filter & Pagination
    async getCustomAgents(first:number,rows:number,filterValue:any,filterMatchMode:string,selectedValue:string[]): Promise<agent[]>{
        return this.agentsRepository.getCustomAgents(
            first,
            rows,
            filterValue,
            filterMatchMode,
            selectedValue
        );
    }

    async getCustomLength(filterValue:any,filterMatchMode:string,selectedValue:string[]): Promise<number>{
        return this.agentsRepository.getCustomLength(
            filterValue,
            filterMatchMode,
            selectedValue,
        );
    }
}
