import { Request, Response } from 'express';
import { IPracticeRepository } from '../../../domain';
import { GetAllPracticesUseCase, GetPracticeByIdUseCase, DeleteUseCase } from '../../../domain/use-cases/student/practice';
import { handleError } from '../../helpers';



export class PracticeController {

    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) { }   

    getPracticeById = (req: Request, res: Response) => {

        const { id } = req.params;
   
        new GetPracticeByIdUseCase( this.practiceRepository ).execute( id )
            .then( practice => res.json( practice ) )
            .catch( error => handleError( error, res ) );
    }

    getAllPractices = (req: Request, res: Response) => {
            
        new GetAllPracticesUseCase( this.practiceRepository ).execute()
            .then( practice => res.json( practice ) )
            .catch( error => handleError( error, res ) );
    }

    delete = (req: Request, res: Response) => {
        
        const { id } = req.params;

        new DeleteUseCase( this.practiceRepository ).execute(id)
        .then( practice => res.json( practice ) )
        .catch( error => handleError( error, res ) );
    }
}