import { Request, Response } from 'express';

export const getUsers = ( req: Request, res: Response ) => {
    res.json({
        msg: {
            id: 2,
            email: 'test1@unicesar.edu.co',
            password: 1234556
        }
    })
}