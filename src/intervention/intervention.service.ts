/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InterventionRepository } from './intervention.repository';
import { intervention } from './schemas/intervention.schema';
import { v4 as uuidv4 } from 'uuid';
//import { createAgentDto,updateAgentDto } from './dto/agents.dto';

@Injectable()
export class InterventionsService {
}