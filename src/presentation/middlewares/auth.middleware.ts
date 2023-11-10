import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { AuthRepository } from '../../infrastructure/repositories';
import { VerifyToken } from '../../domain/types/auth/auth.type';


export class AuthMiddleware {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly verifyToken: VerifyToken = JwtAdapter.validateToken
  ) { }

  validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {

      const payload = await this.verifyToken<{ id: number }>(token);
      if (!payload) return res.status(401).json({ error: 'Invalid token' });

      const user = await this.authRepository.getUserById(payload.id);
      if (!user) return res.status(401).json({ error: 'Invalid token - user not found' })

      req.body.user = user;

      next();

    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }

  }

  
  validateUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'El correo es requerido' });

    const user = await this.authRepository.getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'El correo no es el mismo con el que se registro' });

    next();
  }

}