import { Request, Response } from 'express';
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
    
    const { firstName, lastName, age } = req.body;

    console.log({ firstName, lastName, age });
    

    const user = Object.assign(new User(), {
        firstName,
        lastName,
        age
    })

    const savedUser = await userRepository.save(user)
    console.log({savedUser});
    
}