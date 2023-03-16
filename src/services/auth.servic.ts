import {ApiError} from "../errors";
import {ICredentials, ITokenPair, ITokenPayload, IUser} from "../types";
import {passwordService} from "./password.servic";
import {Token, User} from "../models";
import {tokenService} from "./token.servic";
import {emailService} from "./email.servic";
import {EEmailActions} from "../constants/email.constants";

class AuthService{
    public async register(body: IUser):Promise<void>{
        try {
            const { password } = body;
            const hashedPassword = await passwordService.hash(password);

            await User.create({...body, password: hashedPassword})

            await emailService.sendMail("marianamalynovska221988@gmail.com", EEmailActions.WELCOME);
        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    public async login(credentials: ICredentials,
          user: IUser
          ):Promise<ITokenPair>{
        try {

            const isMatched = await passwordService.compare(
                credentials.password,
                user.password
            );
            if (!isMatched) {
                throw new ApiError("Invalid email or password", 400)
            }

             const tokenPair = tokenService.generateTokenPair({
                 _id: user._id,
                 name: user.name
             });

            await Token.create({
                _user_id:user._id,
                ...tokenPair,
            })

             return tokenPair;

        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    public async refresh(
       tokenInfo:ITokenPair,
       jwtPayload: ITokenPayload
    ):Promise<ITokenPair>{
        try {

            const tokenPair = tokenService.generateTokenPair({
                _id:jwtPayload._id,
                name:jwtPayload.name,
            });

            await Promise.all([
                Token.create({_user_id:jwtPayload._id, ...tokenPair}),
                Token.deleteOne({refreshToken: tokenInfo.refreshToken}),
            ])

            return tokenPair;

        }catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
    public async changePassword(
        user:IUser,
        oldPassword:string,
        newPassword:string,
    ):Promise<void>{

        const isMatched = await passwordService.compare(oldPassword, user.password);
        if (!isMatched){
            throw new ApiError("Wrong old password", 400);
        }
        const hashedNewPassword = await  passwordService.hash(newPassword);
        await User.updateOne({_id: user._id}, {password: hashedNewPassword})
    }


}

export const authService = new AuthService() ;

