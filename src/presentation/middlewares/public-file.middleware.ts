import { NextFunction, Request, Response } from 'express';
import { IPublicFileRepository, IUploadRepository } from '../../domain';


export class PublicFileMiddleware {

  constructor(
    private readonly publicFileRepository: IPublicFileRepository
  ) { }

  validateFile = async (req: Request, res: Response, next: NextFunction) => {

    const { typeFile } = req.body;

    try {
      
      const publicFiles = await this.publicFileRepository.getFiles();
      const file = publicFiles.find( file => file.type === typeFile );
      
      if( file ) return res.status(400).json({ message: 'El archivo ya existe' });
      

      next();

    } catch (error) {

      console.log(error);
      throw error;
    }

  }

}