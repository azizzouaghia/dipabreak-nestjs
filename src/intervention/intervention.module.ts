/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { intervention, interventionSchema } from './schemas/intervention.schema';
import { InterventionController } from './intervention.controller';
import { InterventionRepository } from './intervention.repository';
import { InterventionsService } from './intervention.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name:intervention.name,
        schema:interventionSchema
    }])],
    controllers: [InterventionController],
    providers: [InterventionsService,InterventionRepository],
})
export class AgentsModule {}
