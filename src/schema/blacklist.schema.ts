import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"  ;


// Token class

@Schema( { timestamps: true } )
export class BlackList {

   @Prop()
   token: string  ;
}


// schema

export const BlackListSchema = SchemaFactory.createForClass( BlackList )  ;