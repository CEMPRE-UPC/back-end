import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';


import { uploadFile } from '../helpers/upload-file';
import { FileUpload } from '../interfaces/file-upload';
import Student from '../models/student.model';
import { StudentTypeInfo } from '../interfaces/student-type-info';


export const savePersonalData = async (req: Request, res: Response) => {

  const {
    cedula,
    firstName,
    secondName,
    lastName,
    middleName,
    birthDate,
    martialStatus,
    program,
    address,
    eps,
    email,
    city, 
    userId} = req.body;

  const files = Object.values(req.files!) as FileUpload[];
  const uploadPromises = [];

  try {

    // limpiar directorio estudiantes
    const pathStudent = path.join(__dirname, `../uploads/student/${ cedula }`);
    if ( fs.existsSync(pathStudent) ) {
      fs.rmdirSync(pathStudent, { recursive: true });
    }

    for (let i = 0; i < files.length; i++) {
      uploadPromises.push(uploadFile(files[i], undefined, `/student/${ cedula }/${ StudentTypeInfo.PERSONAL_DATA }`));
    }

    const [cedulaFile, epsFile, photoFile] = await Promise.all(uploadPromises);

    const student =  Student.build({
      cedula,
      firstName,
      secondName,
      lastName,
      middleName,
      birthDate,
      martialStatus,
      program,
      address,
      eps,
      email,
      city,
      cedulaFile,
      epsFile,
      photoFile,
      userId
    });

    try {

      const { dataValues: savedStudent } = await student.save();

      res.json({
        student: savedStudent,
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }

  } catch (error) {
    res.status(400).json({ message: error });
  }



}
