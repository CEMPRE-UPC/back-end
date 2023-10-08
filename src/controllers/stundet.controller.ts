import path from 'path';
import fs from 'fs';

import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

import { uploadFile, mapErrorSequalize } from '../helpers';
import { FileUpload, StudentTypeInfo } from '../interfaces';
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
    userId } = req.body;

  const files = Object.values(req.files!) as FileUpload[];
  const uploadPromises: Promise<string>[] = [];

  try {

    // limpiar directorio estudiantes
    const pathStudent = path.join(__dirname, `../uploads/student/${cedula}`);
    if (fs.existsSync(pathStudent)) {
      fs.rmdirSync(pathStudent, { recursive: true });
    }

    for (let i = 0; i < files.length; i++) {
      uploadPromises.push(uploadFile(files[i], undefined, `/student/${cedula}/${StudentTypeInfo.PERSONAL_DATA}`));
    }

    const [cedulaFile, epsFile, photoFile] = await Promise.all(uploadPromises);

    const student = Student.build({
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
      where: { userId: id },
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

export const updateStudent = async (req: Request, res: Response) => {


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
    city } = req.body;


  const files = Object.values(req.files!) as FileUpload[];
  const uploadPromises: Promise<string>[] = [];

  let fileNames: string[] = ['', '', ''];

  files.forEach((file, index) => {
    if (file.size === 0) {
      fileNames[index] = file.name;
    }
  })

  const filesToUpdate = files.filter(file => file.size > 0);

  console.log({ files });
  console.log({ filesToUpdate });

  try {
    
      // limpiar archivos a actualizar
    
      let filePathToUpdate = path.join(__dirname, `../uploads/student/${cedula}/${StudentTypeInfo.PERSONAL_DATA}`);
    
      filesToUpdate.forEach(file => {
        filePathToUpdate = path.join(filePathToUpdate, file.name);
        if (fs.existsSync(filePathToUpdate)) {
          fs.unlinkSync(filePathToUpdate);
        }
      });
    
      for (let i = 0; i < filesToUpdate.length; i++) {
        uploadPromises.push(uploadFile(filesToUpdate[i], undefined, `/student/${cedula}/${StudentTypeInfo.PERSONAL_DATA}`));
      }
    
      const nameUpdatedFiles = await Promise.all(uploadPromises);
    
      // Recorremos ambos arreglos al mismo tiempo
      for (let i = 0; i < fileNames.length && nameUpdatedFiles.length > 0; i++) {
        // Si el valor en fileNames está vacío, lo llenamos con el primer valor de nameUpdatedFiles
        if (fileNames[i] === '' && nameUpdatedFiles.length > 0) {
          fileNames[i] = nameUpdatedFiles.shift() || ''; // Usamos shift() para sacar el primer elemento de nameUpdatedFiles
        }
      }
    
  
      console.log(firstName);
      

      try {
        const updatedStudent = await Student.update(
          {
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
            city,
            cedulaFile: fileNames[0],
            epsFile: fileNames[1],
            photoFile: fileNames[2],
          },
          { where: { cedula } }
        );


        res.json(updatedStudent);
        
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