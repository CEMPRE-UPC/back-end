import { NextFunction, Request, Response } from 'express';

import { CustomRequest } from '../interfaces';
import { ensureAuth } from '../helpers';
import { User } from '../models';


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];

    try {
        const user = await ensureAuth(authHeader);
        (req as CustomRequest).user = user as User;
        next();

    } catch (msg) {
        console.log(msg);
        return res.status(401).send(msg)
    }

}