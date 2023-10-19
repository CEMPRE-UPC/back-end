
import { Response, NextFunction, Request } from 'express';
import { IRoleRepository } from '../../domain/repositories';

export class RoleMiddleware {

    constructor(
        private readonly roleRepository: IRoleRepository
    ) {}

    validateRole = async(req: Request, res: Response, next: NextFunction ) => {

        const { role: name = 'STUDENT_ROLE' } = req.body;
    
        try {
            const role = await this.roleRepository.getRoleByName(name);
    
            if (!role) { return res.status(400).json({ msg: `El rol ${name} no se encuentra registrado en DB`}) }
    
            req.body.role = role;
            next();
    
        } catch (error) {
            res.status(500).json({
                msg: 'Error, contact with admin 😁'
            })
        }
    
    }
}