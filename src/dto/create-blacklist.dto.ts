import { IsNotEmpty , IsString } from "class-validator"  ;


export class CreateBlackListDto {

    @IsString()
    @IsNotEmpty()
    token : string  ;
}