import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import { mapErrorResult } from '../helpers/map-error-result';


export const validateField = async(req: Request, res: Response, next: NextFunction) => {

    const { name, email, password, role } = req.body;

    const user = Object.assign(new User(), {
        name,
        email,
        password,
        role
    })

    const errors = await validate(user, { 
        skipMissingProperties: true,
        validationError: { target: false }
    });

    if (errors.length > 0) {
        const errorResult = mapErrorResult(errors);
        return res.status(400).json(errorResult);
    }
    next();
}