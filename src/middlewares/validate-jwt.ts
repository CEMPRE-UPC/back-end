import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';
import { CustomRequest } from '../interfaces/custom-request';
import Role from '../models/role.model';


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) return res.status(401).send({ msg: 'No se envio token en el header' });

    try {
        const { uid } = jwt.verify(token, String(process.env.PRIVATE_KEY)) as JwtPayload;

        // Get Authenticated User
        const { dataValues: user } = await User.findByPk(uid, {
            attributes: { exclude: ['roleId'] },
            include: {
                model: Role,
                as: 'role',
            }
        }) ?? {};

        // Validate exist user
        if (!user) return res.status(401).send({ msg: 'token invalido - [no existe en DB]' })

        // Validate user status
        if (!user.status) { return res.status(401).json({ msg: 'Token Invalido - [status=false]' }) }


        (req as CustomRequest).user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).send({ msg: 'Token Invalido!' })
    }

}