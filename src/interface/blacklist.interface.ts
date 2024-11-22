import { Document } from 'mongoose'  ;

export interface IBlackList extends Document {
    
    token: string  ;
}