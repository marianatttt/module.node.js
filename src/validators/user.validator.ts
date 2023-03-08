import * as Joi from "joi";

import {regexConstant} from "../constants";
import {EGenders} from "../types/user.type";
export class UserValidator{
    private static firstName = Joi.string().min(2).max(50).trim();
    private static email = Joi.string().regex(regexConstant.EMAIL).max(50).lowercase().trim();
    private static password = Joi.string().regex(regexConstant.PASSWORD);
    private static gender = Joi.valid(...Object.values(EGenders));

    static createUser = Joi.object({
        name: this.firstName.required(),
        email: this.email.required(),
        password: this.password.required(),
        gender: this.gender.required(),
    });

    static updateUser = Joi.object({
        name: this.firstName,
        gender: this.gender
    });
}