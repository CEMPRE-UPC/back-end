import path from 'path';
import fs from 'fs';

import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

import { uploadFile, mapErrorSequalize } from '../helpers';
import { FileUpload, StudentTypeInfo} from '../interfaces';
import { Student, User } from '../models';


export const saveStudent = async (req: Request, res: Response) => {

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
      if (error instanceof ValidationError) {
        res.status(400).json(mapErrorSequalize(error));
      } else {
        res.status(400).json({ message: error });
      }
    }

  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }



}


export const getAllStudents = async (req: Request, res: Response) => {

  try {
    const allStudents = await Student.findAll({
      attributes: {
        exclude: ['userId']
      },
    });

    // parse "2022-12-16T00:02:42.000Z" a "2022-12-16"
    const students = allStudents.map((student) => {
      const birthDate = student.birthDate.toISOString().split('T')[0];
      return {
        ...student.toJSON(),
        birthDate,
      };
    });
   

  

    res.json(students)
  } catch (error) {
    res.status(500).json({
      msg: 'Error en el servidor'
    })
  }
}

export const getStudentByIdUser = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const { dataValues: student } = await Student.findOne({
      where: { userId: id},
      attributes: {
        exclude: ['userId']
      },
    }) ?? {}
    
    res.json({
      ...student,
      birthDate: student?.birthDate.toISOString().split('T')[0]
    })
  } catch (error) {

    res.status(500).json({
      msg: 'Error en el servidor'
    })
    
  }
}