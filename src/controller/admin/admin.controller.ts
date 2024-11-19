import { Body , Controller , Delete , Get , HttpStatus , Param , Post , Patch , Res } from '@nestjs/common'  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { UpdateAdminDto } from 'src/dto/update-admin.dto'  ;

import { CreateAdminDto } from 'src/dto/create-admin.dto'  ;

import { StudentService } from 'src/service/student/student.service'  ;

import { AdminService } from 'src/service/admin/admin.service'  ;

import { Response } from 'express'  ;

@Controller('admin')
export class AdminController {


  constructor( private readonly studentService: StudentService , private readonly adminService: AdminService ) { }


  @Post( '/create' )
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
    

  // @Post( '/login' )
  // async loginAdmin ( @Res() response : Response , @Body() createStudentDto: CreateStudentDto ) 
  // {
  //   try {
  //     const newEnquiryForm = await this.studentService.createStudent( createStudentDto )  ;

  //     if( !newEnquiryForm )
  //     {
  //       return response.status( HttpStatus.CONFLICT ).json(
  //         {
  //             message: 'Enquiry form already registered with this guardian phone number'  ,
  //             newEnquiryForm
  //         }
  //       )  ;
  //     }
  
  //     return response.status( HttpStatus.CREATED ).json(
  //         {
  //             message: 'Enquiry Form has been created successfully'  ,
  //             newEnquiryForm
  //         }
  //     )  ;
  
  //   } 
  //   catch ( err ) {
    
  //       return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json(
  //           {
  //               statusCode: 500,
  //               message: 'Error: Internal Server Error!',
  //               err
  //           }
  //       )  ;
  //   }
  // }


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
