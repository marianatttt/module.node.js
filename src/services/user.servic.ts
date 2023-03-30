import {IPaginationResponse, IUser} from "../types";
import {ApiError} from "../errors";
import {User} from "../models";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.servic";

class UserService {
 public async getAll ():Promise<IUser[]>{
     try {
         return User.find()
     } catch (e) {
         throw new ApiError(e.message, e.status)
     }
 }

 public async getWithPagaination(query:any):Promise<IPaginationResponse<IUser>>{
     try {
         // використовуємо регулярки для того щоб юзати $lte і т.д

         const queryStr = JSON.stringify(query);
         const queryObj = JSON.parse(queryStr.replace(
             /\b(gte|lte|gt|lt)\b/,
             (match)=>`$${match}`)
         );
         const {
             page = 1,
             limit = 5,
             sortedBy = "createdAt",
             ...searchObject} = queryObj

         const skip = limit*(page-1);
         // 5 користувачів з 2 сторінки  5* (2-1) =5
         // skip 5 пропускає і 5limit ми беремо

         const users = await User.find(searchObject)

         // const users = await User.find({age:{$lte:10}}) - вік в кого менше рівне 10
             //const users = await User.find({age:{$lt:10}}) - вік в кого менше 10
             // ({age:{$gte:10}}) - вік в кого більше рівне 10



             .limit(limit)
             .skip(skip)
             .sort(sortedBy);
         const usersTotalCount = await User.count();


         return {
             page:page,
             itemsCount: usersTotalCount,
             perPage:limit,
             itemsFound:users.length,
             // @ts-ignore
             data:users,

         }

     }catch (e) {
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
    public async update(userId: string, data: Partial<IUser>): Promise<IUser> {
        try {
            return await User.findByIdAndUpdate(userId, data, { new: true });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async delete(userId: string): Promise<void> {
        try {
            await User.deleteOne({ _id: userId });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async uploadAvatar(file:UploadedFile, userId: string):Promise<IUser>{
        try{

            const filePath = await s3Service.uploadPhoto(file,"user", userId)

            // if (user.avatar){
            //     await s3Service.deletePhoto(user.avatar)
            // }

            return await User.findByIdAndUpdate(
                userId,
                {avatar:filePath},
                {new:true}
            )
        }catch (e) {
            throw new ApiError(e.message, e.status);

        }
    }
    public async deleteAvatar(user: IUser): Promise<IUser> {
        try {
            if (!user.avatar) {
                throw new ApiError("User doesnt have avatar", 422);
            }

            await s3Service.deletePhoto(user.avatar);

            return await User.findByIdAndUpdate(
                user._id,
                { $unset: { avatar: true } },
                { new: true }
            );
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}
export const userService = new UserService();