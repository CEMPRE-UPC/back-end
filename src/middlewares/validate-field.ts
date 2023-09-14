import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';


export const validateField = async(req: Request, res: Response, next: NextFunction) => {

    const { name, email, status } = req.body;

    const user = Object.assign(new User(), {
        name,
        email,
        status
    })

    const errors = await validate(user, { 
        skipMissingProperties: true,
        validationError: { target: false }
    });

    if (errors.length > 0) {
        // transform error to: { field: 'name', message: 'El nombre debe tener al menos 3 caracteres' }
        const errorResult = errors.map(error => {
            const { property, constraints } = error;
            if(constraints) {
                const { [Object.keys(constraints)[0]]: message } = constraints;
                return { field: property, message };
            }
        })
        return res.status(400).json(errorResult);

        
    }
    next();
}