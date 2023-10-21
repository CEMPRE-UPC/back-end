import { Request, Response } from 'express';


export class UploadController {

    constructor() {}

    loadFile = (req: Request, res: Response) => {

        const { id, table} = req.params;

        res.json({ id, table });
    }
}