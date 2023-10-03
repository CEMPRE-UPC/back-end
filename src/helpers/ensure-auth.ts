import jwt, { JwtPayload } from 'jsonwebtoken';

import Role from '../models/role.model';
import User from '../models/user.model';
import { UserResponse } from '../interfaces/user-response';


export const ensureAuth = (authHeader: string | undefined): Promise<UserResponse|string> => {
    return new Promise((resolve, reject) => {

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reject({ msg: 'La petición no tiene la cabecera de autenticación o no tiene el formato correcto' });
        }

        const token = authHeader.replace('Bearer ', '');

        try {
            const { uid } = jwt.verify(token, String(process.env.PRIVATE_KEY)) as JwtPayload;

            // Obtener usuario autenticado
            User.findByPk(uid, {
                attributes: { exclude: ['roleId'] },
                include: {
                    model: Role,
                    as: 'role',
                },
            })
                .then((resp) => {

                    
                    
                    const { dataValues: user } = resp ?? {};
                    // Validar existencia del usuario
                    if (!user) return reject({ msg: 'Token inválido - [no existe en DB]' });

                    // Validar estado del usuario
                    if (!user.status) return reject({ msg: 'Token inválido - [status=false]' });
                    resolve(user);
                })
                .catch((error) => {
                    console.log(error);
                    reject({ msg: 'Token inválido!' });
                });
        } catch (error) {
            console.log(error);
            reject({ msg: 'Token inválido!' });
        }
    });
};
