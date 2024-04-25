import { NextFunction, Request, Response } from 'express';
import { 
    FileUpload, 
    GetPublicFileUseCase,
    GetPublicFileByTypeUseCase, 
    GetPublicFilesUseCase, 
    IPublicFileRepository, 
    PublicFileDto, 
    SavePublicFileUseCase, 
    ShowFileByTypeDto, 
    ShowFileDto, 
    UpdatePublicFileUseCase
} from '../../../domain';

import { handleError } from '../../helpers';

export class PublicFileController {

    constructor(
        private readonly publicFileRepository: IPublicFileRepository,
    ) {}

    saveFile = (req: Request, res: Response, next: NextFunction) => {

        const { file } = req.files!;

        const [ error, publicFileDto ] = PublicFileDto.create(req.body, file as FileUpload);
    
        if (error ) return res.status(400).json({ message: error });

        new SavePublicFileUseCase( this.publicFileRepository ).execute(publicFileDto!)
            .then( result => res.status(200).json({ result }))
            .catch( error => handleError(error, res));

    }

    getFiles = (req: Request, res: Response) => {

        new GetPublicFilesUseCase( this.publicFileRepository ).execute()
            .then( files => res.json( files ) )
            .catch( error => handleError( error, res ) );
    }

    getFile = (req: Request, res: Response) => {

        const [ error, showFileDto ] = ShowFileDto.create( req.params );

        if(error) return res.status(400).json({ message: error });

        new GetPublicFileUseCase( this.publicFileRepository ).execute( showFileDto! )
            .then( file => res.sendFile( file ) )
            .catch( error => handleError( error, res ) );
    }

    getFileByType = (req: Request, res: Response) => {
            
            const [ error, showFileByType ] = ShowFileByTypeDto.create( req.params );
    
            if(error) return res.status(400).json({ message: error });
    
            new GetPublicFileByTypeUseCase( this.publicFileRepository ).execute( showFileByType! )
                .then( file => res.sendFile( file ) )
                .catch( error => handleError( error, res ) );
    }

    updateFile = (req: Request, res: Response, next: NextFunction) => {

        const { file } = req.files!;
        const [ error, publicFileDto ] = PublicFileDto.create(req.body, file as FileUpload);
    
        if (error ) return res.status(400).json({ message: error });

        new UpdatePublicFileUseCase( this.publicFileRepository ).execute(publicFileDto!)
            .then( result => res.status(200).json({ result }))
            .catch( error => handleError(error, res));
    }
}