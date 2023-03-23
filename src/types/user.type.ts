
export interface IUser {
    _id?:string;
    name: string;
    email: string;
    password: string;
    gender: string;
    phone: string
}

export interface IPaginationResponse<T>{
    page:number,
    perPage: number,
    itemsCount:number,
    data:T[],
    itemsFound: number,
}