import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { StudentController } from './controller/student/student.controller';

import { StudentSchema } from './schema/student.schema';

import { StudentService } from './service/student/student.service';
import { StudentService } from './student/student.service';


@Module( {

  imports: [ MongooseModule.forRoot( 'mongodb+srv://anshulagr799:agrbobby*07@cluster0.edmtnx7.mongodb.net/admissionEnquiry?retryWrites=true&w=majority&appName=Cluster0' ) ,
             MongooseModule.forFeature( [ { name: 'Student', schema: StudentSchema } ] )
  ] ,

  controllers: [ AppController, StudentController ] ,

  providers: [ AppService, StudentService ] ,
  
} )

export class AppModule {}
