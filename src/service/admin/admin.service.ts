import { Injectable, NotFoundException , Logger } from '@nestjs/common'  ;

import { InjectModel } from '@nestjs/mongoose'  ;

import { IStudent } from 'src/interface/student.interface'  ;

import { IAdmin } from 'src/interface/admin.interface'  ;

import { Model } from "mongoose"  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { UpdateAdminDto } from 'src/dto/update-admin.dto'  ;

import { CreateAdminDto } from 'src/dto/create-admin.dto'  ;

@Injectable()
export class AdminService {



private readonly logger = new Logger( AdminService.name )  ;



constructor( @InjectModel( 'Student' ) private readonly studentModel: Model<IStudent> ,
             @InjectModel('Admin') private readonly adminModel: Model<IAdmin>) { } 



async createAdmin( createAdminDto : CreateAdminDto ) : Promise<IAdmin> { 
  
  try 
  { 
    const existingAdmin = await this.adminModel.findOne( { "username" : createAdminDto.username } ).exec()  ;
      
    if( existingAdmin )
    {
      return null  ;
    }

    const newAdmin = new this.adminModel( createAdminDto )  ; 

    return newAdmin.save()  ; 

  }catch ( error ) 
  { 
      this.logger.error( 'Error creating admin' , error )  ; 

      throw new Error( 'Error creating admin' )  ; 
  } 
}


async loginAdmin( createAdminDto : CreateAdminDto ) : Promise<IAdmin> { 
  
  try 
  { 
    const existingAdmin = await this.adminModel.findOne( createAdminDto ).exec()  ;
      
    if( existingAdmin )
    {
      return existingAdmin  ;
    }

    return null  ;

  }catch ( error ) 
  { 
      this.logger.error( 'Error logging in' , error )  ; 

      throw new Error( 'Error logging in' )  ; 
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
