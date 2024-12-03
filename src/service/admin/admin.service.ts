import { Injectable, NotFoundException , UnauthorizedException , Logger, BadRequestException } from '@nestjs/common'  ;

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

import { IRemarkList } from 'src/interface/remarklist.interface'  ;

import { CreateRemarkListDto } from 'src/dto/create-remarklist.dto';

@Injectable()
export class AdminService {



private readonly logger = new Logger( AdminService.name )  ;



constructor( @InjectModel( 'Student' ) private readonly studentModel: Model<IStudent> ,
             @InjectModel('Admin') private readonly adminModel: Model<IAdmin> ,
             @InjectModel('BlackList') private readonly blacklistModel: Model<IBlackList> ,
             @InjectModel('RemarkList') private readonly remarklistModel: Model<IRemarkList> 
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


async validateToken( token: string ) : Promise< { message : string ; adminName ?: string } > {

  try {
    if ( !token ) 
    {
      throw new UnauthorizedException( 'Token is missing' )  ;
    }

    // Check if the token is blacklisted
    const blacklistedToken = await this.blacklistModel.findOne( { token } )  ;

    if ( blacklistedToken ) 
    {
      throw new UnauthorizedException('Token is revoked')  ;
    }

    const decoded : any = jwt.verify( token , 'schoollog' )  ; 

    if ( !decoded ) {
      throw new UnauthorizedException( 'Invalid token' )  ;
    }

    const admin = await this.adminModel.findById( decoded.id )  ;

    if ( !admin ) 
    {
      throw new UnauthorizedException( 'Admin not found' )  ;
    }

    return {
      message: 'Token is valid',
      adminName: admin.username, 
    }
    
    
  } catch (error) {

    this.logger.error( 'Error validating token' , error )  ;

    throw new UnauthorizedException( 'Invalid or expired token' )  ;
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
  
  
  
  async getAllStudents(
    page: number,
    limit: number,
    search?: string,
    sortBy?: string,
    sortOrder: string = 'asc',
    filters?: any
  ): Promise<{ enquiryFormsData: IStudent[]; total: number; totalPages: number }> {
    try {
      const query: any = {};
  
      // Apply filters
      if (filters) {
        if (filters.gender) query.gender = filters.gender;
        if (filters.currentClass) query.currentClass = filters.currentClass;
        if (filters.enquirySource) query.enquirySource = filters.enquirySource;
        if (filters.wantHostel !== undefined) query.wantHostel = filters.wantHostel;
        if (filters.wantTransport !== undefined) query.wantTransport = filters.wantTransport;
        if (filters.lastYearGrade) query.lastYearGrade = filters.lastYearGrade;
        if (filters.address?.city) query['address.city'] = filters.address.city;
        if (filters.dateOfBirth) {
          query.dateOfBirth = {
            ...(filters.dateOfBirth.gte && { $gte: new Date(filters.dateOfBirth.gte) }),
            ...(filters.dateOfBirth.lte && { $lte: new Date(filters.dateOfBirth.lte) }),
          };
        }
      }
  
      // Apply sorting
      const sortOptions = {};
      if (sortBy) sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
      // Pagination and query execution
      const total = await this.studentModel.countDocuments(query).exec();
      const skip = (page - 1) * limit;
      const students = await this.studentModel.find(query).sort(sortOptions).skip(skip).limit(limit).exec();
      const totalPages = Math.ceil(total / limit);
  
      return {
        enquiryFormsData: students,
        total,
        totalPages,
      };
    } catch (error) {
      this.logger.error('Error fetching enquiry forms', error);
      throw new Error('Error fetching enquiry forms');
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


  async addRemark(
    studentId: string, createRemarkListDto: CreateRemarkListDto, ) {
    
  
    // Find the student by ID
    const student = await this.studentModel.findById(studentId);
  
    if (!student) {
      throw new NotFoundException('Student not found');
    }
  
    const newRemark = await this.remarklistModel.create({
      username: createRemarkListDto.username,
      comment: createRemarkListDto.comment,
      student: student._id
    });
    

    const remarkId : any = newRemark._id  ;

    student.remarks.push( remarkId )  ;
  
    await student.save()  ;
  
    return newRemark  ;
  }
  
  

  async getRemarkListByStudent( studentId: string ) : Promise< any > {

    const student = await this.studentModel.findById( studentId ).populate('remarks').exec()  ;

    if ( !student ) {
      throw new NotFoundException( 'Student not found' )  ;
    }

    return student.remarks  ;
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
