/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { MongooseModule } from '@nestjs/mongoose';
import { agent, agentSchema } from './schemas/agent.schema';
import { AgentsController } from './agents.controller';
import { AgentsRepository } from './agents.repository';

@Module({
    imports: [MongooseModule.forFeature([{
        name:agent.name,
        schema:agentSchema
    }])],
    controllers: [AgentsController],
    providers: [AgentsService,AgentsRepository],
})
export class AgentsModule {}
