import { Body , Controller , Delete , Get , HttpStatus , Param , Post , Patch , Res, Req, UnauthorizedException, Query } from '@nestjs/common'  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { CreateAdminDto } from 'src/dto/create-admin.dto'  ;

import { LoginAdminDto } from 'src/dto/login-admin.dto'  ;

import { StudentService } from 'src/service/student/student.service'  ;

import { AdminService } from 'src/service/admin/admin.service'  ;

import { Response } from 'express'  ;


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
  

  @Post('/validate-token')
  async validateToken( @Req() request : Request , @Res() response : Response ) 
  {
    try {

      const token = request.headers['authorization']  ; 

      const result = await this.adminService.validateToken( token )  ;

      return response.status( HttpStatus.OK ).json( result ) ; 

    } 
    catch (error)
    {
      return response.status( HttpStatus.UNAUTHORIZED ).json(
        {
          message: error.message || 'Invalid or expired token' ,
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
    async getAllStudents( @Query('page') page: string, @Query('limit') limit: string ,  @Query('search') search: string ,
                          @Query('sortBy') sortBy: string ,
                          @Query('sortOrder') sortOrder: string ,
                          @Query('filter') filter: string ,
                          @Res() response : Response ) {
      
      try {

        const pageNum = parseInt( page , 10 ) || 1  ;  
    
        const limitNum = parseInt( limit , 10 ) || 10  ; 

        const { enquiryFormsData , total, totalPages } = await this.adminService.getAllStudents( pageNum , limitNum )  ;
  
        if ( enquiryFormsData.length == 0 ) 
          {
            return response.status( HttpStatus.NOT_FOUND ).json(
              {
                  message: 'No enquiry form found!' ,
                  enquiryFormsData
              }
              )
          }
      
        return response.status( HttpStatus.OK ).json(
          {
              message: 'Enquiry forms found successfully',
              enquiryFormsData,
              pagination : {
                total ,
                totalPages ,
                currentPage : pageNum
              }
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
