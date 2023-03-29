import {IUser} from "../types";
import {configs} from "../configs";

export class UserMapper{
    public toResponse(user:IUser){
        return{
            _id: user._id,
            name: user.name,
            email: user.email,
            gender:user.gender,
            avatar:user.avatar ? `${configs.AWS_S3_URL}/${user.avatar}`:null,
            phone:user.phone
        }
    }
}

export const userMapper = new UserMapper();