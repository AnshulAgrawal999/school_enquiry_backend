import { IsNotEmpty, IsString, MaxLength } from "class-validator"  ;

export class AddressDto {

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  street: string  ;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  city: string  ;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  state: string  ;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  pincode: string  ;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  country: string  ;
}
