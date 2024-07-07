import { Request, Response,  } from 'express';

import { CallDto, ICallRepository, OptionalCallDto } from '../../domain';

import { RegisterCallUseCase, UpdateCallUseCase, GetByCallIdlUseCase, GetAllCallsUseCase, GetByPracticeIdUseCase } from '../../domain/use-cases/call';
import { handleError } from '../helpers';


export class CallController {

    constructor(
        private readonly callRepository: ICallRepository
    ) { }   

    register = async(req: Request, res: Response) => {


        const [ error, callDto] = CallDto.create(req.body);
        console.log(error);
        
        if (error) return res.status(400).json({ message: error });

   
        new RegisterCallUseCase( this.callRepository ).execute( callDto! )
            .then( call => res.json( call ) )
            .catch( error => handleError( error, res ) );
    }

    update = async(req: Request, res: Response) => {

        const { id } = req.params || req.body;

        const [ error, optionalCallDto] = OptionalCallDto.create(req.body, id);
        if (error) return res.status(400).json({ message: error });

        new UpdateCallUseCase( this.callRepository ).execute( optionalCallDto! )
            .then( call => res.json( call ) )
            .catch( error => handleError( error, res ) );

    }

    getCallById = async(req: Request, res: Response) => {
        
        const { id } = req.params;
        new GetByCallIdlUseCase( this.callRepository ).execute( id )
            .then( call => res.json( call ) )
            .catch( error => handleError( error, res ) );
    }

    getAllCalls = async(req: Request, res: Response) => {
            
            new GetAllCallsUseCase( this.callRepository ).execute()
                .then( calls => res.json( calls ) )
                .catch( error => handleError( error, res ) );
    }

    getByPracticeId = async(req: Request, res: Response) => {
            
            const { practiceId } = req.params;
            new GetByPracticeIdUseCase( this.callRepository ).execute( practiceId )
                .then( calls => res.json( calls ) )
                .catch( error => handleError( error, res ) );
    }

}