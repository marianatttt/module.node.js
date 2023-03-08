import {User} from "../models/User.model";
import {IUser} from "../types/user.type";
import {ApiError} from "../errors/api.error";

class UserService {
 public async getAll ():Promise<IUser[]>{
     try {
         return User.find()
     } catch (e) {
         throw new ApiError(e.message, e.status)
     }
 }

 public async getById(id:string): Promise<IUser>{
     try{
         return User.findById(id);
     } catch (e) {
         throw new ApiError(e.message, e.status);
     }
 }
}

export const userService = new UserService();