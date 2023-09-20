import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { CustomRequest } from '../interfaces/custom-request';
import Role from '../models/role.model';


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

export const saveUser = async (req: Request | CustomRequest, res: Response) => {

    const { name, email, password } = req.body;
    const roleId = ( req as CustomRequest ).roleId;

    const user = User.build({ name, email, password, roleId });
    
    //Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.set({ password: bcrypt.hashSync(password, salt) });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
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