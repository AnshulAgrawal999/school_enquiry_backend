import { Body , Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common'  ;

import { CreateStudentDto } from 'src/dto/create-student.dto'  ;
 
import { UpdateStudentDto } from 'src/dto/update-student.dto'  ;

import { StudentService } from 'src/service/student/student.service'  ;


@Controller( 'student' )
export class StudentController {

  constructor( private readonly studentService: StudentService ) { }

  @Post()
  async createStudent ( @Res() response , @Body() createStudentDto: CreateStudentDto ) 
  {
    try {
      const newEnquiryForm = await this.studentService.createStudent( createStudentDto )  ;

      if( !newEnquiryForm )
      {
        return response.status( HttpStatus.CONFLICT ).json(
          {
              message: 'Enquiry form already registered with this guardian phone number'  ,
              newEnquiryForm
          }
        )  ;
      }
  
      return response.status( HttpStatus.CREATED ).json(
          {
              message: 'Enquiry Form has been created successfully'  ,
              newEnquiryForm
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



  @Patch( '/:id' )
  async updateStudent( @Res() response , @Param( 'id' ) enquiryFormId: string , @Body() updateStudentDto: UpdateStudentDto ) 
  {
    try {
      const existingEnquiryForm = await this.studentService.updateStudent( enquiryFormId , updateStudentDto )  ;
  
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
  async getStudent( @Res() response , @Param( 'id' ) enquiryFormId: string ) {
   try {
      const existingEnquiryForm = await this.studentService.getStudent( enquiryFormId )  ;
  
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
  async getAllStudents( @Res() response ) {
    
    try {
    
      const enquiryFormData = await this.studentService.getAllStudents()  ;

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
            message: 'All enquiry forms data found successfully',
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
  async deleteStudent( @Res() response , @Param( 'id' ) enquiryFormId: string )
  {
    try {
  
      const deletedEnquiryForm = await this.studentService.deleteStudent( enquiryFormId )  ;
  
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
