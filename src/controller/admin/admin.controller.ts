import { Body , Controller , Delete , Get , HttpStatus , Param , Patch , Res } from '@nestjs/common'  ;

import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { StudentService } from 'src/service/student/student.service'  ;

import { AdminService } from 'src/service/admin/admin.service'  ;

import { Response } from 'express'  ;

@Controller('admin')
export class AdminController {


    constructor( private readonly studentService: StudentService , private readonly adminService: AdminService ) { }


    @Patch( '/:id' )
    async updateStudent( @Res() response : Response , @Param( 'id' ) enquiryFormId: string , @Body() updateStudentDto: UpdateStudentDto ) 
    {
      try {
        const existingEnquiryForm = await this.adminService.updateStudent( enquiryFormId , updateStudentDto )  ;
    
        return response.status( HttpStatus.OK ).json(
              {
                  message: 'Enquiry Form has been successfully updated',
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
