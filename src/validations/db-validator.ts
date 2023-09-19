import User from '../models/user.model';
import Role from '../models/role.model';

export const isValidRole = async(role: string = 'STUDENT_ROLE') => {

    const existRole = await Role.findOne({ where: { role }  });

    if (!existRole) throw new Error(`El rol ${role} no se encuentra registrado en la DB`);
}

export const validateEmailInDB = async(email: string = '') => {
    
    const  existEmail = await User.findOne({ where: { email } });

    if (existEmail) throw new Error('El correro ingresado ya se encuentra registrado');
}

export const existUserById = async(id: string = '') => {
    
    const user = await User.findOne({where: { id }});

    if (!user) throw new Error(`El usuario con id ${ id } no existe`)
}