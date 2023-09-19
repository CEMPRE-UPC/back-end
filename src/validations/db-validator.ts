import { NextFunction, Request, Response } from 'express';

import User from '../models/user.model';
import Role from '../models/role.model';
import { CustomRequest } from '../interfaces/custom-request';

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

export const validateEmailInDB = async(email: string = '') => {
    
    const  existEmail = await User.findOne({ where: { email } });

    if (existEmail) throw new Error('El correro ingresado ya se encuentra registrado');
}

export const existUserById = async(id: string = '') => {
    
    const user = await User.findOne({where: { id }});

    if (!user) throw new Error(`El usuario con id ${ id } no existe`)
}