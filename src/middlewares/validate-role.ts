import { Response, NextFunction, Request } from 'express';
import { CustomRequest } from '../interfaces/custom-request';
import Role from '../models/role.model';


export const isValidRole = async(req: Request, res: Response, next: NextFunction ) => {

    const { role = 'STUDENT_ROLE' } = req.body;

    try {
        const { dataValues: existRole } = await Role.findOne({ where: { role }  }) ?? {};

        if (!existRole) { return res.status(400).json({ msg: `El rol ${role} no se encuentra registrado en DB`}) }

        (req as CustomRequest).roleId = existRole.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, contact with admin 😁'
        })
        
    }

}

export const isAdminRole = (req: CustomRequest | Request, res: Response, next: NextFunction) => {
    
    const { user } = (req as CustomRequest);

    if (!user) {
        return res.status(500).json({ msg: 'Está intentando verificar el rol si validar el token antes' });
    }

    if(user.role.role !== 'ADMIN_ROLE') {
        return res.status(401).json({ msg: 'No es usuario ADMIN - No puede realizar esta accion' });
    }

    next();
}
