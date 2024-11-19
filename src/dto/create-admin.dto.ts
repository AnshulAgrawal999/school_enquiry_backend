import { IsNotEmpty , IsString , MaxLength } from "class-validator"  ;

export class CreateAdminDto {

    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    username: string  ;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    password: string  ;
}