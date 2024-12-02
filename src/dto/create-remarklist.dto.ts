import { IsNotEmpty , IsString, MaxLength } from "class-validator"  ;
import { Types } from "mongoose";


export class CreateRemarkListDto {

    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    username: string  ;

    @IsString()
    comment : string  ;

    @IsNotEmpty()   
    student : Types.ObjectId  ; // Reference to the Student
}