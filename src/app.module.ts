import { Module } from '@nestjs/common'  ;

import { MongooseModule } from '@nestjs/mongoose'  ;

import { AppController } from './app.controller'  ;

import { AppService } from './app.service'  ;

import { StudentSchema } from './schema/student.schema'  ;

import { StudentController } from './controller/student/student.controller'  ;

import { StudentService } from './service/student/student.service'  ;

import { AdminController } from './controller/admin/admin.controller'  ;

import { AdminService } from './service/admin/admin.service'  ;


@Module( {

  imports: [ MongooseModule.forRoot( 'mongodb+srv://anshulagr799:agrbobby*07@cluster0.edmtnx7.mongodb.net/admissionEnquiry?retryWrites=true&w=majority&appName=Cluster0' ) ,
             MongooseModule.forFeature( [ { name: 'Student', schema: StudentSchema } ] )
  ] ,

  controllers: [ AppController, StudentController , AdminController ] ,

  providers: [ AppService, StudentService , AdminService ] ,
  
} )

export class AppModule {}
