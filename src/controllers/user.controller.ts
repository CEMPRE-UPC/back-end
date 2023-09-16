import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';


import db from '../db/connection';
import { User } from '../models/user.model';

const userRepository = db.getRepository(User);

export const getUsers = async( req: Request, res: Response ) => {

    try {
        const users = await userRepository.find()
        res.send(users);
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
    
}

export const saveUser = async( req: Request, res: Response) => {
    
    const { name, email, password, role } = req.body;

    const user = Object.assign(new User(), {
        name,
        email,
        password,
        role
    })

    //Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    try {
        const savedUser = await userRepository.save(user)
        res.send(savedUser);
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }
    
}