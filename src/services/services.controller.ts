/* eslint-disable prettier/prettier */
import { Controller,Get,Post,Put,Delete,Param,Body,UsePipes,ValidationPipe} from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
import { createServiceDto, updateServiceDto } from './dto/services.dto';
import { service } from './schemas/service.schema';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService:ServicesService){}
    //Obtenir Le Nombre Services
    @Get('')
    async getNombreServices(): Promise<number> {
        return this.servicesService.getNombreServices();
    }
    //Trouver Une Service Par serviceId
    @Get(':id')
    async getService(@Param('id') serviceId: string): Promise<service>{
        return this.servicesService.getServiceById(serviceId);
    }
    //Cree Une Service
    @Post()
    @UsePipes(new ValidationPipe())
    async createService(@Body() createdService: createServiceDto): Promise<service>{
        return this.servicesService.createService(createdService);
    }
    //Modifier Une Service
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateService(@Body() updatedService: updateServiceDto,@Param('id') serviceId:string): Promise<service>{
        return this.servicesService.updateService(serviceId,updatedService);
    }
    //Supprimer Une Service
    @Delete(':id')
    async deleteService(@Param('id') serviceId:string){
        return this.servicesService.deleteService(serviceId)
    }
    //Filter & Pagination
    @Get('filter/:filter')
    async getCustomServices(@Param('filter') filters: string): Promise<service[]> {
        const filter: FilterDto = JSON.parse(filters);
        const first: number = filter.first;
        const rows: number = filter.rows;
        return this.servicesService.getCustomServices(first,rows);
    }

}
