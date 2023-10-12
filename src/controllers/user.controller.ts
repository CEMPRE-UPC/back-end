import { Request, Response } from 'express';

import { User, Role } from '../models';


export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['roleId']
            },
            include: {
                model: Role,
                as: 'role',
            }
        });
        res.send(users);
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userUpdate = await User.update({ status: false }, { where: { id } });
        res.send(userUpdate);

    } catch (error) {

        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }

}

export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { password, role, status, id: _id, ...rest } = req.body;

    console.log(rest);
    

    try {

        const userUpdate = await User.update(rest, { where: { id } });
        res.send(userUpdate);

    } catch (error) {

        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
}