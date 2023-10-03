import path from 'path';
import { Request, Response } from 'express';

import Student from '../models/student.model';
import { StudentTypeFiles } from '../interfaces/student-type-files';


export const showFile = async(req: Request, res: Response) => {

    const { table, typeInfo, cedula, typeFile } = req.params;

    if (table !== 'student') {
        return res.status(400).json({
            msg: 'La tabla no es válida'
        });
    }

    // validate que typeFile sea un tipo de archivo válido
    if (!Object.values(StudentTypeFiles).includes(typeFile as StudentTypeFiles)) {
        return res.status(400).json({
            msg: 'El tipo de archivo no es válido'
        });
    }

    const { dataValues: student } = await Student.findOne({ where: { cedula } }) ?? {};

    if( !student ) {
        return res.status(400).json({
            msg: 'El estudiante no existe'
        });
    }

    const nameFile: string = `${typeFile}File`;

    const file = student[nameFile as keyof Student];

    const pathFile = path.join(__dirname, `../uploads/${ table }/${ cedula }/${ typeInfo }/${ file }`);
    return res.sendFile(pathFile);
}