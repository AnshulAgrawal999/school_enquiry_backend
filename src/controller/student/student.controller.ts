import { Body , Controller , HttpStatus , Post, Res } from '@nestjs/common'  ;

import { CreateStudentDto } from 'src/dto/create-student.dto'  ;
 
import { StudentService } from 'src/service/student/student.service'  ;

import { Response } from 'express'  ;


@Controller( 'student' )
export class StudentController {


  constructor( private readonly studentService: StudentService ) { }


  @Post()
  async createStudent ( @Res() response : Response , @Body() createStudentDto: CreateStudentDto ) 
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
              message: 'new enquiry form created successfully'  ,
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


  }
