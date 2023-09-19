import { Response, NextFunction, Request } from 'express';
import { CustomRequest } from '../interfaces/custom-request';

export const isAdminRole = (req: CustomRequest | Request, res: Response, next: NextFunction) => {
    
    const user = (req as CustomRequest).user;

    if (!user) {
        res.status(500).json({ msg: 'Está intentando verificar el rol si validar el token antes' });
    }

    next();
}
