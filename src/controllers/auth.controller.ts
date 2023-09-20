import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/generate-jwt';



export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        // Verifies if the email exists
        const response = await User.findOne({ where: { email } });
        const user = response?.dataValues;
        
        if (!user) { return res.status(400).json({ msg: 'User / Password are not correct - email' }) }
        
        // Verifies if the user is active
        if (!user.status) { return res.status(400).json({ msg: ' The user is not active - state: false' }) }

        // Verifies the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) { return res.status(400).json({ msg: 'User / Password are not correct - password' }) }

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