import { IsMongoId, IsNotEmpty , IsString, MaxLength } from "class-validator"  ;


export class CreateRemarkListDto {

    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    username: string  ;

    @IsString()
    comment : string  ;
}