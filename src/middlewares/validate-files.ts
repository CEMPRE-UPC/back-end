import { Request, Response, NextFunction } from 'express';

export const validateUploadFiles = (req: Request, res: Response, next: NextFunction ) => {

    if (!req.files || Object.keys(req.files).length < 3 ) {
        return res.status(400).json({
            msg: 'Se requiere subir 3 archivos - validateUploadFiles'
        });
    }
    next();

}