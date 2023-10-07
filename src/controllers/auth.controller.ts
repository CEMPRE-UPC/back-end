import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User, Role } from '../models';
import { generateJWT, ensureAuth } from '../helpers';
import { CustomRequest } from '../interfaces';


export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        // Verifies if the email exists
        const response = await  User.findOne({
            where: { email },
            attributes: { exclude: ['role_id'] },
            include: {
                model: Role,
                as: 'role',
            },
        })
        const user = response?.dataValues;
        
        if (!user) { return res.status(401).json({ msg: 'User / Password are not correct - email' }) }
        
        // Verifies if the user is active
        if (!user.status) { return res.status(401).json({ msg: ' The user is not active - state: false' }) }

        // Verifies the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) { return res.status(401).json({ msg: 'User / Password are not correct - password' }) }

        // Generates the JWT

        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login ok',
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, contact with admin 😁'
        })
    }
}

export const saveUser = async (req: Request | CustomRequest, res: Response) => {

    const { name, email, password } = req.body;
    const role = ( req as CustomRequest ).role;

    const user = User.build({ name, email, password, roleId: role.id });
    
    //Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.set({ password: bcrypt.hashSync(password, salt) });

    try {
        const { dataValues: savedUser } = await user.save()
        const token = await generateJWT(savedUser.id);
        const { roleId, ...rest } = savedUser;
        
        res.send({user: { ...rest, role }, token});
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor'
        })
    }

}

export const checkToken = async (req: Request, res: Response) => {
    
    const authHeader = req.headers['authorization'];

    try {
        const user = await ensureAuth(authHeader);
        res.json(user)
        
        
    } catch (msg) {
        res.status(401).json(msg);
    }
   
}