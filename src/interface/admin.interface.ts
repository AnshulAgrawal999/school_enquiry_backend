import { Document } from 'mongoose'  ;

export interface IAdmin extends Document {

    username : string  ;

    email: string  ;

    password : string  ;
}