import {NextFunction, Response, Request} from "express";

import {ApiError} from "../errors";
import { isObjectIdOrHexString} from "mongoose";
import {ObjectSchema} from "joi";

class CommonMiddleware {
    public isIdValid(idField: string, from: "params" | "query" = "params") {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!isObjectIdOrHexString(req[from][idField])) {
                    throw new ApiError("ID not valid", 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
    public isBodyValid(validator: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = validator.validate(req.body);

                if (error) {
                    throw new ApiError(error.message, 400);
                }

                req.body = value;
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}











export const commonMiddleware = new CommonMiddleware();