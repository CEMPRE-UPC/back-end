import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';


export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }

}

export const saveUser = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body;

    const user = User.build({ name, email, password, role });
    
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