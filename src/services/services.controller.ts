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
    @Get('filter/:filter')
    async getCustomServices(@Param('filter') filters: string) {
        const filter: FilterDto = JSON.parse(filters);
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
        const services = await this.servicesService.getCustomServices(
            first,
            rows,
            filterValue,
            filterMatchMode,
            selectedValue[0],
        );
        const length = await this.servicesService.getCustomLength(
            filterValue,
            filterMatchMode,
            selectedValue[0],
        );
        const result = { results: services, length: length };
        return result;
}
}