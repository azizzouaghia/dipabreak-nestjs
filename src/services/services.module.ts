/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { service, serviceSchema } from './schemas/service.schema';
import { ServicesController } from './services.controller';
import { ServicesRepository } from './services.repository';

@Module({
    imports: [MongooseModule.forFeature([{
        name:service.name,
        schema:serviceSchema
    }])],
    controllers: [ServicesController],
    providers: [ServicesService,ServicesRepository],
})
export class ServicesModule {}
