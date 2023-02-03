import { ServicesModule } from './services/services.module';
import { AgentsModule } from './agents/agents.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServicesModule,
    MongooseModule.forRoot(
      'mongodb+srv://ainzooalgown:0101Atlas@cluster0.wug3rze.mongodb.net/dipabreak',
    ),
    ServicesModule,
    AgentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
