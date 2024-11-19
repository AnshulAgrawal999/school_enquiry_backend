import { Injectable, Logger } from '@nestjs/common'  ;

import { InjectModel } from '@nestjs/mongoose'  ;

import { CreateStudentDto } from 'src/dto/create-student.dto'  ;

import { IStudent } from 'src/interface/student.interface'  ;

import { Model } from "mongoose"  ;


@Injectable()
export class StudentService {


private readonly logger = new Logger( StudentService.name )  ; 


constructor( @InjectModel( 'Student' ) private readonly studentModel: Model<IStudent> ) { } 



async createStudent( createStudentDto : CreateStudentDto ) : Promise<IStudent> { 
  
  try 
  { 
      const existingEnquiryForm = await this.studentModel.findOne( { "guardianPhoneNumber" : createStudentDto.guardianPhoneNumber } ).exec()  ;
      
      if( existingEnquiryForm )
      {
        return null  ;
      }

      const newEnquiryForm = new this.studentModel( createStudentDto )  ; 

      return newEnquiryForm.save()  ; 

  }catch ( error ) 
  { 
      this.logger.error( 'Error creating enquiry form' , error )  ; 

      throw new Error( 'Error creating enquiry form' )  ; 
  } 
}




}