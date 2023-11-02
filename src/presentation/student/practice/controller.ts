import { Request, Response } from 'express';
import { IPracticeRepository, PracticeDto } from '../../../domain';
import { GetPracticeByIdUseCase, RegisterUseCase, UpdateUseCase } from '../../../domain/use-cases/student/practice';
import { handleError } from '../../helpers';



export class PracticeController {

    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) { }   

    register = async(req: Request, res: Response) => {

        const [ error, studentDto] = PracticeDto.create(req.body);
        
        if (error) return res.status(400).json({ message: error });

   
        new RegisterUseCase( this.practiceRepository ).execute( studentDto! )
            .then( practice => res.json( practice ) )
            .catch( error => handleError( error, res ) );
    }

    update = async(req: Request, res: Response) => {

        const [ error, studentDto] = PracticeDto.create(req.body);
        console.log(error);
        
        if (error) return res.status(400).json({ message: error });

   
        new UpdateUseCase( this.practiceRepository ).execute( studentDto! )
            .then( practice => res.json( practice ) )
            .catch( error => handleError( error, res ) );
    }

    getByStudentId = async(req: Request, res: Response) => {

        const { studentId } = req.params;
        console.log(studentId);
        
   
        new GetPracticeByIdUseCase( this.practiceRepository ).execute( studentId )
            .then( practice => res.json( practice ) )
            .catch( error => handleError( error, res ) );
    }
}