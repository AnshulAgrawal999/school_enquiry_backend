import { Document } from 'mongoose'  ;

export interface IStudent extends Document {
    
    guardianName : string  ;

    relation : string  ;

    guardianEmail : string  ;

    guardianPhoneNumber : string  ;

    guardianMobileNumberOpt ?: string  ;

    studentName : string  ;

    gender : boolean  ;

    currentClass : string  ;

    dateOfBirth : string  ;

    currentSchool ?: string  ;

    lastYearGrade ?: string  ;

    address : {

      street : string  ;

      city : string  ;

      state : string  ;

      pincode : string  ;

      country : string  ;

    }  ;

    enquirySource: string  ;

    description ?: string  ;

    wantHostel: boolean  ;

    wantTransport: boolean  ;
}