import { Injectable, NotFoundException , Logger } from '@nestjs/common'  ;

import { InjectModel } from '@nestjs/mongoose'  ;

import { CreateStudentDto } from 'src/dto/create-student.dto'  ;

import { IStudent } from 'src/interface/student.interface'  ;

import { Model } from "mongoose"  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

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



async updateStudent( enquiryFormId : string , updateStudentDto : UpdateStudentDto ) : Promise<IStudent> { 
  
  try 
  { 
      const existingEnquiryForm = await this.studentModel.findByIdAndUpdate( enquiryFormId , updateStudentDto , { new: true } ).exec()  ; 

      if ( !existingEnquiryForm ) 
      {
        throw new NotFoundException( `EnquiryForm #${enquiryFormId} not found` )  ;
      }

      return existingEnquiryForm  ;

  }catch ( error ) 
  { 
      this.logger.error( 'Error updating enquiry form' , error )  ; 

      throw new Error( 'Error updating enquiry form' )  ; 
  } 
}




async getAllStudents() : Promise<IStudent[]> { 
  
  try 
  { 
      const enquiryFormData = await this.studentModel.find().exec()  ;

      return enquiryFormData  ;

  }catch ( error ) 
  { 
      this.logger.error( 'Error fetching enquiry forms' , error )  ; 

      throw new Error( 'Error fetching enquiry forms' )  ; 
  } 
}



async getStudent( enquiryFormId : string ) : Promise<IStudent> { 
  
  try 
  { 
      const existingEnquiryForm = await this.studentModel.findById( enquiryFormId ).exec()  ; 

      if ( !existingEnquiryForm ) 
      {
        throw new NotFoundException( `Enquiry form #${enquiryFormId} not found` )  ;
      }
      return existingEnquiryForm  ;  

  }catch ( error ) 
  { 
      this.logger.error( 'Error fetching enquiry form' , error )  ; 

      throw new Error( 'Error fetching enquiry form' )  ; 
  } 
}



async deleteStudent( enquiryFormId : string ) : Promise<IStudent> { 
  
  try 
  { 
      const deletedEnquiryForm = await this.studentModel.findByIdAndDelete( enquiryFormId ).exec()  ; 

      if ( !deletedEnquiryForm ) 
      {
        throw new NotFoundException( `Enquiry form #${enquiryFormId} not found` )  ;
      }
      return deletedEnquiryForm  ;

  }catch ( error ) 
  { 
      this.logger.error( 'Error deleting enquiry form' , error )  ; 

      throw new Error( 'Error deleting enquiry form' )  ; 
  } 
}


}