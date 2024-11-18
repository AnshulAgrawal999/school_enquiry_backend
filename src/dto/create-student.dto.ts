import { IsNotEmpty , IsString , IsBoolean , MaxLength , IsDate , ValidateNested , IsEmail , IsNumberString } from "class-validator"  ;

import { Type } from 'class-transformer'  ;

import { AddressDto } from "./address.dto";

export class CreateStudentDto {
  
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  guardianName: string  ;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  relation: string  ;

  @IsEmail()
  @MaxLength(40)
  @IsNotEmpty()
  guardianEmail: string  ;

  @IsNumberString()
  @MaxLength(15)
  @IsNotEmpty()
  guardianPhoneNumber: string  ;

  @IsNumberString()
  @MaxLength(15)
  guardianMobileNumberOpt ?: string  ;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  studentName: string  ;

  @IsBoolean()
  @IsNotEmpty()
  gender: boolean  ;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  currentGrade: string  ;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date  ;

  @IsString()
  @MaxLength(40)
  currentSchool ?: string  ;

  @IsString()
  @MaxLength(5)
  lastYearGrade ?: string  ;

  // @ValidateNested()
  @Type( () => AddressDto )
  // @IsNotEmpty()
  address: AddressDto  ;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  enquirySource: string  ;

  @IsString()
  @MaxLength(200)
  description ?: string  ;

  @IsBoolean()
  @IsNotEmpty()
  wantHostel: boolean  ;

  @IsBoolean()
  @IsNotEmpty()
  wantTransport: boolean  ;
}