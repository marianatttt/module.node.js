import {User} from "../../models";
import {IUser} from "../../types";
import {ApiError} from "../errors";

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