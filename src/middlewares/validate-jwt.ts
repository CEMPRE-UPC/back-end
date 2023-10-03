import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/custom-request';
import { ensureAuth } from '../helpers/ensure-auth';
import { UserResponse } from '../interfaces/user-response';


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];

    try {
        const user = await ensureAuth(authHeader);
        (req as CustomRequest).user = user as UserResponse;
        next();

    } catch (msg) {
        console.log(msg);
        return res.status(401).send(msg)
    }

}