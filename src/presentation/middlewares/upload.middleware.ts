import { NextFunction, Request, Response } from 'express';
import { CustomError, FileUpload, IStudentRepository, IUploadRepository } from '../../domain';
import { UploadDto } from '../../domain/dtos/upload/upload.dto';


export class UploadMiddleware {

  constructor(
    private readonly uploadRepository: IUploadRepository
  ) { }

  validateFile = async (req: Request, res: Response, next: NextFunction) => {

    const { studentId, typeFile } = req.body;

    try {
      
      const attachedFiles = await this.uploadRepository.getFilesByStudentId(studentId);
      const file = attachedFiles.find( file => file.type === typeFile );
      
      if( file ) return res.status(400).json({ message: 'El archivo ya existe' });
      

      next();

    } catch (error) {

      console.log(error);
      throw error;
    }

  }

}