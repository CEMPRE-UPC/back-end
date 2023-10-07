import path from 'path';
import { Request, Response } from 'express';

import { Student } from '../models';
import { StudentTypeFiles } from '../interfaces';


export const showFile = async (req: Request, res: Response) => {

    const { typeUser, typeInfo, cedula, file } = req.params;

    if (typeUser !== 'student') {
        return res.status(400).json({
            msg: 'La tabla no es válida'
        });
    }

    const { dataValues: student } = await Student.findOne({ where: { cedula } }) ?? {};

    if (!student) {
        return res.status(400).json({
            msg: 'El estudiante no existe'
        });
    }

    //obtener los valores del objeto student
    const studentValues = Object.values(student) as string[];

    const foundFile = studentValues.find(item => {
        if (typeof item === 'string') {
            const fileName = item.split('.')[0]; // Obtener el nombre del archivo sin extensión
            return fileName === file;
        }
        return false;
    });

    if (!foundFile) {
        return res.status(400).json({
            msg: 'El archivo no existe'
        });

    }

    const pathFile = path.join(__dirname, `../uploads/${typeUser}/${cedula}/${typeInfo}/${foundFile}`);
    return res.sendFile(pathFile);
}