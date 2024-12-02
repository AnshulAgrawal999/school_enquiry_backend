import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"  ;

import { Document, Types } from "mongoose"  ;

@Schema( { timestamps: true }  )
export class RemarkList extends Document {
    
    @Prop()
    username : string  ;

    @Prop()
    comment : string  ;

    // Reference to the Student
    @Prop( { type: Types.ObjectId, ref: 'Student' } )
    student: Types.ObjectId  ;

}

export const RemarkListSchema = SchemaFactory.createForClass( RemarkList )  ;