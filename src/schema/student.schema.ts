import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"  ;

import { Document } from "mongoose"  ;


export enum EnquirySource {
    youtube = 'youTube'  ,
    instagram = 'instagram'  ,
    schoolFair = 'school_fair'  ,
    referral = 'referral'  ,
    others = 'others'  ,
  }
  
  export enum Class {
      preNursery = "pre-nursery"  ,
      nursery = "nursery"  ,
      lkg = "LKG"  ,
      kg = "KG"  ,
      firstClass = "1st class"  ,
      secondClass = "2ndclass"  ,
      thirdClass = "3rd class"  ,
      fourthClass = "4th class"  ,
      fifthClass = "5th class"  ,
      sixthClass = "6th class"  ,
      seventhClass = "7th class"  ,
      eighthClass = "8th class"  ,
      ninethClass = "9th class"  ,
      tenthClass = "10th class"  ,
  }


// Define the Address class

@Schema()
class Address {

  @Prop()
  street: string  ;   

  @Prop()
  city: string  ;

  @Prop()
  state: string  ;

  @Prop()
  pincode: string  ;

  @Prop()
  country: string  ;
}


// Define the Student class

@Schema()
export class EnquiryForm extends Document {

    @Prop()
    guardianName : string  ;

    @Prop()
    relation : string  ;

    @Prop()
    guardianEmail : string  ;

    @Prop()
    guardianPhoneNumber : string  ;

    @Prop()
    guardianMobileNumberOpt ?: string  ;

    @Prop()
    studentName: string  ;

    @Prop()
    gender: boolean  ;

    @Prop()
    class: string  ;

    @Prop()
    dateOfBirth: Date  ;

    @Prop()
    currentSchool: string  ;

    @Prop( { type: Address } )
    address: Address  ;

    @Prop()
    enquirySource: string  ;

    @Prop()
    description: string  ;

    @Prop()
    wantHostel: boolean  ;
}



// Create the schema

export const StudentSchema = SchemaFactory.createForClass( EnquiryForm )  ;