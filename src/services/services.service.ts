/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { service } from './schemas/service.schema';
import { v4 as uuidv4 } from 'uuid';
import { createServiceDto,updateServiceDto } from './dto/services.dto';

@Injectable()
export class ServicesService {
    constructor(private readonly servicesRepository: ServicesRepository){}
    //Trouver Tous Les Services
    async getServices(): Promise<service[]> {
        return this.servicesRepository.find({});
    }
    //Trouver Une Service Par Id
    async getServiceById(serviceId:string): Promise<service>{
        return this.servicesRepository.findOne({serviceId});
    }
    //Cree Une Service
    async createService(service:createServiceDto): Promise<service> {
        return this.servicesRepository.create({
            serviceId: uuidv4(),
            ...service,
            createdDate: new Date(),
            clients:[],
            agents:[]
        })
    }
    //Modifier Une Service
    async updateService(serviceId:string,updatedService:updateServiceDto): Promise<service>{
        return this.servicesRepository.update({serviceId},updatedService);
    }
    //Supprimer Une Service
    async deleteService(serviceId:string){
        return this.servicesRepository.delete({serviceId});
    }

}
