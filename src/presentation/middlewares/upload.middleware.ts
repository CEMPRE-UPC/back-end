import { NextFunction, Request, Response } from 'express';
import { CustomError, FileUpload, IStudentRepository, IUploadRepository } from '../../domain';
import { UploadDto } from '../../domain/dtos/upload/upload.dto';


export class UploadMiddleware {

  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly uploadRepository: IUploadRepository
  ) { }

  validateStudent = async (req: Request, res: Response, next: NextFunction) => {

    const { file } = req.files!;
    const [ error, uploadDto ] = UploadDto.create(req.body, file as FileUpload);

    if (error ) return res.status(400).json({ message: error });

    const { studentId, cedula, typeFile } = uploadDto!;

    try {

      
      const attachedFiles = await this.uploadRepository.getFilesByStudentId(studentId);
      const file = attachedFiles.find( file => file.type === typeFile );
      
      if( file ) return res.status(400).json({ message: 'El archivo ya existe' });
      
      const student = await this.studentRepository.getStudentByIdAndCedula(studentId, cedula);
      if (!student) return res.status(404).json({ message: 'El estudiante no existe' });
      
      req.body.uploadDto = uploadDto;

      next();

    } catch (error) {

      console.log(error);
      throw error;
    }

  }

}