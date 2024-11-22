import { Module } from '@nestjs/common'  ;

import { MongooseModule } from '@nestjs/mongoose'  ;

import { AppController } from './app.controller'  ;

import { AppService } from './app.service'  ;

import { StudentSchema } from './schema/student.schema'  ;

import { StudentController } from './controller/student/student.controller'  ;

import { StudentService } from './service/student/student.service'  ;

import { AdminController } from './controller/admin/admin.controller'  ;

import { AdminService } from './service/admin/admin.service'  ;

import { AdminSchema } from './schema/admin.schema';

import { ConfigModule } from '@nestjs/config'  ;

import { AuthModule } from './auth/auth.module';
import { BlackListSchema } from './schema/blacklist.schema';


@Module( {

  imports: [ ConfigModule.forRoot( { isGlobal: true } ) ,
             MongooseModule.forRoot( process.env.mongodbUrl  ) ,
             MongooseModule.forFeature( [ { name: 'Student', schema: StudentSchema } , { name: 'Admin', schema: AdminSchema } , { name: 'BlackList', schema: BlackListSchema }  ] ),
             AuthModule
  ] ,

  controllers: [ AppController, StudentController , AdminController ] ,

  providers: [ AppService, StudentService , AdminService ] ,
  
} )

export class AppModule {}
