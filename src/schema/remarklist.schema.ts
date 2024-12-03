import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"  ;

import { Types, Schema as MongooseSchema } from "mongoose"  ;

@Schema( { timestamps: true }  )
export class RemarkList {
    
    @Prop()
    username : string  ;

    @Prop()
    comment : string  ;

    // Reference to the Student
    @Prop( { type: MongooseSchema.Types.ObjectId, ref: 'Student' } )
    student: Types.ObjectId  ;

}

export const RemarkListSchema = SchemaFactory.createForClass( RemarkList )  ;