import { Request, Response } from 'express';
import { FileUpload, IUploadRepository, SaveFileUseCase, UploadDto } from '../../domain/';
import { handleError } from '../helpers';


export class UploadController {

    constructor(
        private readonly uploadRepository: IUploadRepository
    ) {}

    loadFile = (req: Request, res: Response) => {

        const { file } = req.files!;
        const [ error, uploadDto ] = UploadDto.create(req.body, file as FileUpload);
        if (error ) return res.status(400).json({ error });

        new SaveFileUseCase( this.uploadRepository ).execute(uploadDto!)
            .then( result => res.status(200).json({ result }))
            .catch( error => handleError(error, res));

    }
}