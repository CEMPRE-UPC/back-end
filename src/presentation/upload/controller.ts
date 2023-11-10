import { NextFunction, Request, Response } from 'express';
import { FileUpload, GetFileUseCase, GetFilesByIdUseCase, IUploadRepository, SaveFileUseCase, ShowFileDto, UpdateFileUseCase, UploadDto } from '../../domain/';
import { handleError } from '../helpers';

export class UploadController {

    constructor(
        private readonly uploadRepository: IUploadRepository,
    ) {}

    saveFile = (req: Request, res: Response, next: NextFunction) => {

        const { file } = req.files!;
        const [ error, uploadDto ] = UploadDto.create(req.body, file as FileUpload);
    
        if (error ) return res.status(400).json({ message: error });

        new SaveFileUseCase( this.uploadRepository ).execute(uploadDto!)
            .then( result => res.status(200).json({ result }))
            .catch( error => handleError(error, res));

    }

    getFilesOfStudent = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new GetFilesByIdUseCase( this.uploadRepository ).execute( studentId )
            .then( files => res.json( files ) )
            .catch( error => handleError( error, res ) );
    }

    getFile = (req: Request, res: Response) => {

        const [ error, showFileDto ] = ShowFileDto.create( req.params );

        if(error) return res.status(400).json({ message: error });

        new GetFileUseCase( this.uploadRepository ).execute( showFileDto! )
            .then( file => res.sendFile( file ) )
            .catch( error => handleError( error, res ) );
    }

    updateFile = (req: Request, res: Response, next: NextFunction) => {

        const { file } = req.files!;
        const [ error, uploadDto ] = UploadDto.create(req.body, file as FileUpload);
    
        if (error ) return res.status(400).json({ message: error });

        new UpdateFileUseCase( this.uploadRepository ).execute(uploadDto!)
            .then( result => res.status(200).json({ result }))
            .catch( error => handleError(error, res));
    }
}