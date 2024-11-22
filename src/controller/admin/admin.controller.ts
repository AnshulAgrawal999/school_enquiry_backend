import { Body , Controller , Delete , Get , HttpStatus , Param , Post , Patch , Res, Req, UnauthorizedException } from '@nestjs/common'  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { CreateAdminDto } from 'src/dto/create-admin.dto'  ;

import { LoginAdminDto } from 'src/dto/login-admin.dto'  ;

import { StudentService } from 'src/service/student/student.service'  ;

import { AdminService } from 'src/service/admin/admin.service'  ;

import { Response } from 'express'  ;
import { CreateBlackListDto } from 'src/dto/create-blacklist.dto';

@Controller('admin')
export class AdminController {


  constructor( private readonly studentService: StudentService , private readonly adminService: AdminService ) { }


  @Post( '/register' )
  async createAdmin ( @Res() response : Response , @Body() createAdminDto: CreateAdminDto ) 
  {
    try {
      const newAdmin = await this.adminService.createAdmin( createAdminDto )  ;

      if( !newAdmin )
      {
        return response.status( HttpStatus.CONFLICT ).json(
          {
              message: 'Admin with this username already registered'  ,
              newAdmin
          }
        )  ;
      }
  
      return response.status( HttpStatus.CREATED ).json(
          {
              message: 'new Admin created successfully'  ,
              newAdmin
          }
      )  ;
  
    } 
    catch ( err ) {
    
        return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json(
            {
                statusCode: 500,
                message: 'Error: Internal Server Error!',
                err
            }
        )  ;
    }
  }
    

  @Post( '/login' )
  async loginAdmin ( @Res() response : Response , @Body() loginAdminDto: LoginAdminDto ) 
  {
    try {
      const token = await this.adminService.loginAdmin( loginAdminDto )  ;

      if( !token )
      {
        return response.status( HttpStatus.NOT_FOUND ).json(
          {
              message: 'No Admin account with this username and password'  ,
              token
          }
        )  ;
      }
  
      return response.status( HttpStatus.OK ).json(
          {
              message: 'Login successful'  ,
              token
          }
      )  ;
  
    } 
    catch ( err ) {
    
        return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json(
            {
                statusCode: 500,
                message: 'Error: Internal Server Error!',
                err
            }
        )  ;
    }
  }


  @Post( '/logout' )
  async logoutAdmin ( @Req() req : Request , @Res() response : Response ) 
  {
    try {
      const token = req.headers['authorization']  ;

      if( !token )
      {
        throw new UnauthorizedException('No token provided')  ; 
      }
  
    const isRevoked = await this.adminService.isTokenRevoked( token )  ;

    if ( isRevoked ) 
    {
      throw new UnauthorizedException( 'Token has already been blacklisted' )  ;
    }

    await this.adminService.logoutAdmin( token )  ;

    return response.status( HttpStatus.OK ).json(
      {
          statusCode: 200 ,
          message: 'Logout successful'
      }
    );
  
    } 
    catch ( err ) {
    
        return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json(
            {
                statusCode: 500,
                message: 'Error: Internal Server Error!',
                err
            }
        )  ;
    }
  }

    @Patch( '/:id' )
    async updateStudent( @Res() response : Response , @Param( 'id' ) enquiryFormId: string , @Body() updateStudentDto: UpdateStudentDto ) 
    {
      try {
        const existingEnquiryForm = await this.adminService.updateStudent( enquiryFormId , updateStudentDto )  ;
    
        return response.status( HttpStatus.OK ).json(
              {
                  message: 'Enquiry Form successfully updated',
                  existingEnquiryForm
              }
          )  ;
      } 
      catch (err) {
      
        return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json(
          {
              statusCode: 500,
              message: 'Error: Internal Server Error!',
              err
          }
      )  ;
  
     }
    }
  

    @Get( '/:id' )
    async getStudent( @Res() response : Response , @Param( 'id' ) enquiryFormId: string ) {
     try {
        const existingEnquiryForm = await this.adminService.getStudent( enquiryFormId )  ;
    
        return response.status( HttpStatus.OK ).json(
          {
            message: 'Enquiry Form found successfully'  ,
            existingEnquiryForm
          }
      )  ;
     } 
     catch ( err ) {
  
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        {
            statusCode: 500,
            message: 'Error: Internal Server Error!',
            err
        }
    )  ;
     }
    }
    
  
    @Get()
    async getAllStudents( @Res() response : Response ) {
      
      try {
      
        const enquiryFormData = await this.adminService.getAllStudents()  ;
  
        if ( enquiryFormData.length == 0 ) 
          {
            return response.status( HttpStatus.NOT_FOUND ).json(
              {
                  message: 'No enquiry form found!' ,
                  enquiryFormData
              }
              )
          }
      
        return response.status( HttpStatus.OK ).json(
          {
              message: 'Enquiry forms found successfully',
              enquiryFormData
          }
          )  ;
  
      } 
      catch (err) {
    
          return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json(
            {
                statusCode: 500,
                message: 'Error: Internal Server Error!',
                err
            }
        )  ;
    
     }
    }
  
  
    @Delete( '/:id' )
    async deleteStudent( @Res() response : Response , @Param( 'id' ) enquiryFormId: string )
    {
      try {
    
        const deletedEnquiryForm = await this.adminService.deleteStudent( enquiryFormId )  ;
    
        return response.status( HttpStatus.OK ).json(
          {
            message: 'Enquiry Form deleted successfully',
            deletedEnquiryForm
          }
        )  ;
      }
      catch ( err ) {
    
        return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json(
          {
              statusCode: 500,
              message: 'Error: Internal Server Error!',
              err
          }
      )  ; 
      }
     }


}
