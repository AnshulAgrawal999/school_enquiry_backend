import { Module } from '@nestjs/common'  ;
import { AppController } from './app.controller'  ;
import { AppService } from './app.service'  ;
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports: [ MongooseModule.forRoot('mongodb+srv://anshulagr799:agrbobby*07@cluster0.edmtnx7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { dbName: 'studentEnquiry' } )  ] ,

  controllers: [ AppController ] ,

  providers: [ AppService ] ,
  
})

export class AppModule {}
