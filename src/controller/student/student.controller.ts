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
  
      return response.status( HttpStatus.CREATED ).json(
          {
              message: 'EnquiryForm has been created successfully'  ,
              newEnquiryForm
          }
      )  ;
  
   } catch ( err ) {
  
      return response.status( HttpStatus.BAD_REQUEST ).json(
          {
              statusCode: 400,
              message: 'Error: EnquiryForm not created!',
              error: 'Bad Request'
          }
      )  ;
   }
  }



  @Patch( '/:id' )
  async updateStudent( @Res() response , @Param( 'id' ) enquiryFormId: string , @Body() updateStudentDto: UpdateStudentDto ) 
  {
    try {
    const existingEnquiryForm = await this.studentService.updateStudent( enquiryFormId , updateStudentDto )  ;
  0
    return response.status( HttpStatus.OK ).json(
          {
              message: 'EnquiryForm has been successfully updated',
              existingEnquiryForm
          }
  )  ;
   } catch (err) {
  
     return response.status( err.status ).json( err.response )  ;
  
   }
  }

  @Get( '/:id' )
  async getStudent( @Res() response , @Param( 'id' ) enquiryFormId: string ) {
   try {
      const existingEnquiryForm = await this.studentService.getStudent( enquiryFormId )  ;
  
      return response.status( HttpStatus.OK ).json(
        {
          message: 'EnquiryForm found successfully'  ,
          existingEnquiryForm
        }
    )  ;
   } catch ( err ) {
     return response.status( err.status ).json( err.response )  ;
   }
  }
  

  @Get()
  async getAllEnquiryForms( @Res() response ) {
  try {
  
    const enquiryFormData = await this.studentService.getAllStudents()  ;
  
    return response.status( HttpStatus.OK ).json(
      {
          message: 'All enquiry forms data found successfully',
          enquiryFormData
      }
      )  ;
      } catch (err) {
  
      return response.status( err.status ).json( err.response )  ;
  
   }
  }


  @Delete( '/:id' )
  async deleteEnquiryForm( @Res() response , @Param( 'id' ) enquiryFormId: string )
  {
    try {
  
      const deletedEnquiryForm = await this.studentService.deleteStudent( enquiryFormId )  ;
  
      return response.status( HttpStatus.OK ).json(
        {
          message: 'EnquiryForm deleted successfully',
          deletedEnquiryForm
        }
      )  ;
    }catch (err) {
  
      return response.status( err.status ).json( err.response )  ;
  
    }
   }
  }
