import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"  ;

import { Document } from "mongoose"  ;


// Token class

@Schema( { timestamps: true } )
export class BlackList extends Document {

   @Prop()
   token: string  ;
}


// schema

export const BlackListSchema = SchemaFactory.createForClass( BlackList )  ;