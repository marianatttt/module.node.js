import {NextFunction, Request, Response} from "express";

import {ApiError} from "../src/errors";
import {Token} from "../src/models";
import {tokenService} from "../src/services";
import {ETokenType} from "../src/enums";


class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const accessToken = req.get("Authorization");

            if (!accessToken) {
                throw new ApiError("No token", 401);
            }

            const jwtPayload = tokenService.checkToken(accessToken);

            const tokenInfo = await Token.findOne({ accessToken });

            if (!tokenInfo) {
                throw new ApiError("Token not valid", 401);
            }

            req.res.locals = { tokenInfo, jwtPayload };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const refreshToken = req.get("Authorization");

            if (!refreshToken) {
                throw new ApiError("No token", 401);
            }

            const jwtPayload = tokenService.checkToken(
                refreshToken,
                ETokenType.refresh
            );

            const tokenInfo = await Token.findOne({ refreshToken });

            if (!tokenInfo) {
                throw new ApiError("Token not valid", 401);
            }

            req.res.locals = { tokenInfo, jwtPayload };
            next();
        } catch (e) {
            next(e);
        }
    }
}



export const authMiddleware = new AuthMiddleware();