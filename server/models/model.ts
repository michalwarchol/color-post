import {Document, Model, ObjectId} from 'mongoose';
import { ColorType } from 'reducers/types';

export interface IUser extends Document {
    _id: ObjectId
    name: string,
    password: string,
    likedPalettes: ObjectId[],
    
}

export interface IUserModel extends Model<IUser>{
    login(name: string, password: string): Promise<IUser>
}

export interface IPalette extends Document {
    _id: ObjectId
    user: string,
    palette: ColorType[],
    likes: number
}