/* eslint-disable prettier/prettier */
import { Controller,Get,Post,Put,Delete,Param,Body,UsePipes,ValidationPipe} from '@nestjs/common';
//import { } from './dto/filter.dto';
//import { createAgentDto, updateAgentDto } from './dto/agents.dto';
import { intervention } from './schemas/intervention.schema';
import { InterventionsService } from './intervention.service';

@Controller('agents')
export class InterventionController {
}