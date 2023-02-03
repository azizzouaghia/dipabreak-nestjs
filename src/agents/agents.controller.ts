/* eslint-disable prettier/prettier */
import { Controller,Get,Post,Put,Delete,Param,Body,UsePipes,ValidationPipe} from '@nestjs/common';
import { AgentFilterDto } from './dto/filter.dto';
import { createAgentDto, updateAgentDto } from './dto/agents.dto';
import { agent } from './schemas/agent.schema';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
    constructor(private readonly agentsService:AgentsService){}
    //Trouver Un Agent Par agentId
    @Get(':id')
    async getAgent(@Param('id') agentId: string): Promise<agent>{
        return this.agentsService.getAgentById(agentId);
    }
    //Cree Un Agent
    @Post()
    @UsePipes(new ValidationPipe())
    async createAgent(@Body() createdAgent: createAgentDto): Promise<agent>{
        createdAgent.name = createdAgent.name.trim();
        return this.agentsService.createAgent(createdAgent);
    }
    //Modifier Un Agent
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateAgent(@Body() updatedAgent: updateAgentDto,@Param('id') agentId:string): Promise<agent>{
        return this.agentsService.updateAgent(agentId,updatedAgent);
    }
    //Supprimer Un Agent
    @Delete(':id')
    async deleteAgent(@Param('id') agentId:string){
        return this.agentsService.deleteAgent(agentId)
    }
    //Filter & Pagination
    @Get('filter/:filter')
    async getCustomAgents(@Param('filter') filters: string) {
        const filter: AgentFilterDto = JSON.parse(filters);
        const first: number = filter.first;
        const rows: number = filter.rows;

        //Obtenir Le Champs Selectioner (name,description,price....)
        const selectedValue:string[] = [];
        Object.keys(filter.filters).forEach(function (key) {
            if (filter.filters[key].matchMode !== '') {
                selectedValue.push(key);
            }
        });
        let filterValue="" ;
        let filterMatchMode=""; 
        if(selectedValue[0]){
            filterValue = filter.filters[selectedValue[0]].value;
            filterMatchMode = filter.filters[selectedValue[0]].matchMode;
        }else{
            filterValue = filterValue = filter.filters.name.value;
            filterMatchMode = filter.filters.name.matchMode;
        }
        const services = await this.agentsService.getCustomAgents(
            first,
            rows,
            filterValue,
            filterMatchMode,
            selectedValue[0],
        );
        const length = await this.agentsService.getCustomLength(
            filterValue,
            filterMatchMode,
            selectedValue[0],
        );
        const result = { results: services, length: length };
        return result;
}
}