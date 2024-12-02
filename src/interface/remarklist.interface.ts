import { Document, Types } from 'mongoose'  ;

export interface IRemarkList extends Document {

    username : string  ;

    comment : string  ;

    student: Types.ObjectId  ; // Reference to the Student schema
}