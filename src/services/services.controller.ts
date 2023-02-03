/* eslint-disable prettier/prettier */
import { Controller,Get,Post,Put,Delete,Param,Body,UsePipes,ValidationPipe} from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
import { createServiceDto, updateServiceDto } from './dto/services.dto';
import { service } from './schemas/service.schema';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService:ServicesService){}
    //Trouver Une Service Par serviceId
    @Get(':id')
    async getService(@Param('id') serviceId: string): Promise<service>{
        return this.servicesService.getServiceById(serviceId);
    }
    //Cree Une Service
    @Post()
    @UsePipes(new ValidationPipe())
    async createService(@Body() createdService: createServiceDto): Promise<service>{
        createdService.name = createdService.name.trim();
        createdService.description = createdService.description.trim();
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
    @Get("filter/:filter")
    async getCustomAgents(@Param("filter") filters: string) {
        const filter: FilterDto = JSON.parse(filters);
        const first: number = filter.first;
        const rows: number = filter.rows;

        // Obtenir the selected fields (name, description, price, etc.)
        const selectedValue: string[] = [];
        const filterMatchMode: any = {};
        Object.keys(filter.filters).forEach(function(key) {
            if (filter.filters[key].matchMode !== "") {
            selectedValue.push(key);
            filterMatchMode[key] = filter.filters[key].matchMode;
            }
        });
        const filterValue = {};
        selectedValue.forEach(value => {
            filterValue[value] = filter.filters[value].value;
        });
        const services = await this.servicesService.getCustomServices(
            first,
            rows,
            filterValue,
            filterMatchMode,
            selectedValue
        );
        const length = await this.servicesService.getCustomLength(
            filterValue,
            filterMatchMode,
            selectedValue
        );
        const result = { results: services, length: length };
        return result;
    }
}