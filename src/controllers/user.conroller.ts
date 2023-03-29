import {Response, Request, NextFunction} from "express";

import {User} from "../models";
import {IUser, IMessage} from "../types";
import {userService} from "../services";
import {UploadedFile} from "express-fileupload";

class UserController {
    public async getAll(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response<IUser[]>> {
        try{

            const users = await userService.getWithPagaination(req.query);

            return res.json(users);
        }catch (e) {
            next(e)
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response<IMessage>> {
        try{
            const {user} = res.locals;
            return res.json(user)  
        } catch (e) {
            next (e)
        }
    }

    public async create(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response<IUser>> {
        try {
            const body = req.body;
            const user = await User.create(body);

            return res.status(201).json({
                message: "User Created",
                data: user,
            });
        } catch (e) {
            next(e)
        }
    }

    public async update(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response<IUser>> {
        try {
            const {userId} = req.params;

            const updateUser = await User.findByIdAndUpdate(
                userId,
                {...req.body},
                {new: true}
            );

            return res.status(201).json(updateUser)
        } catch (e) {
            next(e)
        }
    }

    public async delete(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response<void>> {
        try {
            const {userId} = req.params;
            await User.deleteOne({_id: userId});
            return res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    }

    public async uploadAvatar(
        req: Request,
        res: Response,
        next:NextFunction
    ): Promise<Response<void>> {
        try {
            const {userId} = req.params;
            const avatar = req.files.avatar as UploadedFile;


            const user  = await userService.uploadAvatar(avatar, userId);
            return res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    }




}

export const userController = new UserController();
