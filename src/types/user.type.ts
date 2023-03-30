import {Model} from "mongoose";

export interface IUser {
    _id?:string;
    name: string;
    email: string;
    password: string;
    gender: string;
    phone?: string;
    avatar?:string;
}
export interface IUserMethods {
    nameWithAge(): void;
}

export interface IUserVirtuals {
    nameWithSurname: string;
}

export interface IUserModel
    extends Model<IUser, object, IUserMethods, IUserVirtuals> {
    findByName(name: string): Promise<IUser[]>;
}


export interface IPaginationResponse<T>{
    page:number,
    perPage: number,
    itemsCount:number,
    data:T[],
    itemsFound: number,
}