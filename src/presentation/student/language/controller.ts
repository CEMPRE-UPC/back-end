import { Request, Response } from 'express';
import { ILanguageRepository, LanguageDto, OptionalLanguageDto } from '../../../domain';
import { RegisterUseCase, UpdateUseCase, GetAllByStudentIdUseCase, DeleteUseCase } from '../../../domain/use-cases/student/language';
import { handleError } from '../../helpers';

export class LanguageController {


    constructor(
        private readonly languageRepository: ILanguageRepository
    ) {}


    register = async(req: Request, res: Response) => {

        const [ error, languageDto] = LanguageDto.create(req.body);
        console.log(error);
        
        if (error) return res.status(400).json({ message: error });

        new RegisterUseCase( this.languageRepository ).execute(languageDto!)
        .then( language => res.json( language ) )
        .catch( error => handleError( error, res ) );
    }

    update = async(req: Request, res: Response) => {
        
        const [ error, optLanguageDto] = OptionalLanguageDto.create(req.body, req.params.id);
        if (error) return res.status(400).json({ message: error });

        new UpdateUseCase( this.languageRepository ).execute(optLanguageDto!)
        .then( language => res.json( language ) )
        .catch( error => handleError( error, res ) );
    }

    getLanguagesByStudentId = async(req: Request, res: Response) => {
            
        const { studentId } = req.params;
    
        new GetAllByStudentIdUseCase( this.languageRepository ).execute(studentId)
        .then( languages => res.json( languages ) )
        .catch( error => handleError( error, res ) );
    }

    delete = async(req: Request, res: Response) => {
        
        const { id } = req.params;

        new DeleteUseCase( this.languageRepository ).execute(id)
        .then( language => res.json( language ) )
        .catch( error => handleError( error, res ) );
    }
}