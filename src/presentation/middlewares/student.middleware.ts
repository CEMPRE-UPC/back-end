import { Request, Response, NextFunction } from 'express';

import { AuthRepository } from '../../infrastructure/repositories';


export class StudentMiddleware {
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    validateStudent = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;

        if (!email) return res.status(400).json({ error: 'El correo es requerido' });

        const user = await this.authRepository.getUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'El correo no es el mismo con el que se registro' });

        next();
    }
}