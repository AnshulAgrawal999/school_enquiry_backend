import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"  ;

import { Types , Schema as MongooseSchema } from "mongoose"  ;

import { RemarkList } from "./remarklist.schema"  ;


 export enum Gender  
 {
    male = "male" ,
    female = "female" ,
    others = "others" 
 }


 export enum currentClass {
     preSchool = 'pre school' ,
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


 export enum Grade 
 {
    a_plus = "A+" ,
    b_plus = "B+" ,
    c_plus = "C+" ,
    a = "A" ,
    b = "B" ,
    c = "C" ,
    a_minus = "A-" ,
    b_minus = "B-" ,
    c_minus = "C-" ,
    fail = "Fail"
 }


export enum State
{
   Andhra_Pradesh , 
   Arunachal_Pradesh, 
   Assam, 
   Bihar, 
   Chhattisgarh, 
   Goa, 
   Gujarat, 
   Haryana, 
   Himachal_Pradesh, 
   Jammu_and_Kashmir, 
   Jharkhand, 
   Karnataka, 
   Kerala, 
   Ladakh, 
   Madhya_Pradesh, 
   Maharashtra, 
   Manipur, 
   Meghalaya, 
   Mizoram, 
   Nagaland, 
   Odisha, 
   Punjab, 
   Rajasthan, 
   Sikkim, 
   Tamil_Nadu, 
   Telangana, 
   Tripura, 
   Uttar_Pradesh, 
   Uttarakhand, 
   West_Bengal
}
 
export enum EnquirySource {
   referral = 'referral'  ,
   youtube = 'youTube'  ,
   instagram = 'instagram'  ,
   schoolFair = 'school_fair'  ,
   others = 'others'  
 }


 
// Address class

@Schema()
class Address {

  @Prop()
  street : string  ;   

  @Prop()
  city : string  ;

  @Prop()
  state : string  ;

  @Prop()
  pincode : string  ;

  @Prop()
  country : string  ;
}

// Student class

@Schema( { timestamps: true } )
export class Student  {

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
   studentName : string  ;

   @Prop()
   gender : string  ;

   @Prop()
   currentClass : string  ;

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

   // Array of RemarkList references
   @Prop( [ { type: MongooseSchema.Types.ObjectId , ref: RemarkList.name } ] )
   remarks: Types.ObjectId[]  ;
}


// schema

export const StudentSchema = SchemaFactory.createForClass( Student )  ;