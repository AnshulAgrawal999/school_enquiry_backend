import { Injectable, NotFoundException , UnauthorizedException , Logger } from '@nestjs/common'  ;

import { InjectModel } from '@nestjs/mongoose'  ;

import { IStudent } from 'src/interface/student.interface'  ;

import { IAdmin } from 'src/interface/admin.interface'  ;

import { Model } from "mongoose"  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { CreateAdminDto } from 'src/dto/create-admin.dto'  ;

import * as bcrypt from 'bcrypt'  ;

import * as jwt from 'jsonwebtoken'  ;

import { LoginAdminDto } from 'src/dto/login-admin.dto'  ;

import { IBlackList } from 'src/interface/blacklist.interface'  ;
import { CreateBlackListDto } from 'src/dto/create-blacklist.dto'  ;

@Injectable()
export class AdminService {



private readonly logger = new Logger( AdminService.name )  ;



constructor( @InjectModel( 'Student' ) private readonly studentModel: Model<IStudent> ,
             @InjectModel('Admin') private readonly adminModel: Model<IAdmin> ,
             @InjectModel('BlackList') private readonly blacklistModel: Model<IBlackList> 
             ) { } 



async createAdmin( createAdminDto : CreateAdminDto ) : Promise<IAdmin> { 
  
  try 
  { 
    const existingAdmin = await this.adminModel.findOne( { "username" : createAdminDto.username } ).exec()  ;
      
    if( existingAdmin )
    {
      return null  ;
    }

    const hashedPassword = await bcrypt.hash( createAdminDto.password , 3 )  ;

    const newAdmin = new this.adminModel( { ...createAdminDto , password : hashedPassword } )  ; 

    return newAdmin.save()  ; 

  }catch ( error ) 
  { 
      this.logger.error( 'Error creating admin' , error )  ; 

      throw new Error( 'Error creating admin' )  ; 
  } 
}


async loginAdmin( loginAdminDto : LoginAdminDto ) : Promise< IBlackList > { 
  
  try 
  { 
    const existingAdmin = await this.adminModel.findOne( { username : loginAdminDto.username } ).exec()  ;
      
    if( !existingAdmin )
    {
      throw new UnauthorizedException( 'Invalid username' )  ;
    }

    const isPasswordValid = await bcrypt.compare( loginAdminDto.password, existingAdmin.password )  ;

    if ( !isPasswordValid ) {

      throw new UnauthorizedException( 'Invalid password' )  ;
    }

    const tokenString = jwt.sign( { id: existingAdmin._id , username: existingAdmin.username } , 'schoollog', {
      expiresIn: '10h' ,
    }  )  ;

    return tokenString ;

  }catch ( error ) 
  { 
      this.logger.error( 'Error logging in' , error )  ; 

      throw new Error( 'Error logging in' )  ; 
  } 
}



async logoutAdmin( token: string ) : Promise< { message: string } > { 
  
  try 
  { 
    const newToken = new this.blacklistModel( { token } )  ;

    await newToken.save()  ;

    return { message: 'Logout successful' }  ;

  }catch ( error ) 
  { 
      this.logger.error( 'Error logging out' , error )  ; 

      throw new Error( 'Error logging out' )  ; 
  } 
}

async isTokenRevoked( createBlackListDto : CreateBlackListDto ) : Promise <boolean> {
  
  try {
    
      const revokedToken = await this.blacklistModel.findOne( { token : createBlackListDto.token } )  ;

      return revokedToken ? true : false  ;

  } catch (error) {

      this.logger.error( 'Error checking backlisted status' , error )  ; 

      throw new Error( 'Error checking backlisted status' )  ; 
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
