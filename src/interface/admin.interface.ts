import { Document } from 'mongoose'  ;

export interface IAdmin extends Document {

    username : string  ;

    password : string  ;
}