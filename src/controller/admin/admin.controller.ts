import { Body , Controller , Delete , Get , HttpStatus , Param , Post , Patch , Res, Req, UnauthorizedException, Query, BadRequestException } from '@nestjs/common'  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { CreateAdminDto } from 'src/dto/create-admin.dto'  ;

import { LoginAdminDto } from 'src/dto/login-admin.dto'  ;

import { AdminService } from 'src/service/admin/admin.service'  ;

import { Response } from 'express'  ;

import { CreateRemarkListDto } from 'src/dto/create-remarklist.dto';

import { Types } from 'mongoose';


@Controller('admin')
export class AdminController {


  constructor( private readonly adminService: AdminService ) { }


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
              message: 'Incorrect password'  ,
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

  
  
  @Get()
  async getAllStudents(
    @Res() response: Response,
    @Query('limit') limit: number = 10 ,
    @Query('page') page: number = 1 ,
    @Query('state') state:string = "" ,
    @Query('enquirySource') enquirySource:string = "", 
    @Query('searchedName') searchedName : string = "",
    @Query('sort') sort:string = "",
    @Query('nameSort') nameSort:string=""
  ) 
  {

  try {
    
    const { enquiryFormsData, total, totalPages } = await this.adminService.getAllStudents(
      limit, page,state,enquirySource,searchedName,sort,nameSort 
    );

    return response.status(HttpStatus.OK).json({
      message: 'Enquiry forms found successfully',
      enquiryFormsData,
      pagination: {
        total,
        totalPages,
        currentPage: page ,
      },
    });
  } catch (err) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Error: Internal Server Error!',
      err,
    });
  }
}


@Get( 'studentcount' )
async getNumberOfStudents(@Res() response: Response): Promise<void> {
  try {
    const studentCount = await this.adminService.getNumberOfStudents();
    response.status(HttpStatus.OK).json({
      message: 'Enquiry forms count found successfully',
      studentCount,
    });
  } catch (err) {
    console.error('Error in getNumberOfStudents:', err); // Add detailed logs
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Error: Internal Server Error!',
      error: err.message, // Include error message for easier debugging
    });
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


@Post( 'addremark/:studentId' )
async addRemark( @Param('studentId') studentId: string, @Body() createRemarkListDto: CreateRemarkListDto ) {

  if (!Types.ObjectId.isValid(studentId)) 
  {
    throw new BadRequestException('Invalid student ID')  ;
  }
  
  return this.adminService.addRemark( studentId , createRemarkListDto )  ;

}


@Get( 'remarklist/:studentId' )
async getRemarkListByStudent( @Param( 'studentId' ) studentId: string ) {

  return this.adminService.getRemarkListByStudent( studentId )  ;

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
