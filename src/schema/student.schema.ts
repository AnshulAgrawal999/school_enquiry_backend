import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"  ;

import { Document } from "mongoose"  ;


export enum EnquirySource {
   youtube = 'youTube'  ,
   instagram = 'instagram'  ,
   schoolFair = 'school_fair'  ,
   referral = 'referral'  ,
   others = 'others'  ,
 }
 
 export enum Grade {
     preSchool = 'pre_school' ,
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

 export enum Gender 
 {
    male = "male" ,
    female = "female" ,
    others = "others" 
 }


// Address class

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

// Student class

@Schema( { timestamps: true } )
export class Student extends Document {

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
   currentGrade: string  ;

   @Prop()
   dateOfBirth: string  ;

   @Prop()
   currentSchool ?: string  ;

   @Prop()
   lastYearGrade ?: string  ;

   @Prop( { type: Address } )
   address: Address  ;

   @Prop()
   enquirySource: string  ;

   @Prop()
   description ?: string  ;

   @Prop()
   wantHostel: boolean  ;

   @Prop()
   wantTransport: boolean  ;
}


// schema

export const StudentSchema = SchemaFactory.createForClass( Student )  ;