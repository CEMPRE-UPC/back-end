import { Request, Response,  } from 'express'
import { IStudentRepository, OptionalStudentDto, RegisterStudentUseCase, StudentDto } from '../../../domain'
import { handleError } from '../../helpers';
import { UpdateStudentUseCase } from '../../../domain/use-cases';
import { GetStudentByIdUseCase } from '../../../domain/use-cases/student/get-student.usecase';

export class StudentController {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) { }   

    register = async(req: Request, res: Response) => {

        const [ error, studentDto] = StudentDto.create(req.body);
        console.log(error);
        
        if (error) return res.status(400).json({ message: error });

        console.log(studentDto);
        

        new RegisterStudentUseCase( this.studentRepository ).execute( studentDto! )
            .then( student => res.json( student ) )
            .catch( error => handleError( error, res ) );
    }

    update = async(req: Request, res: Response) => {

        const [ error, optionalStudentDto] = OptionalStudentDto.create(req.body, req.params.cedula);
        if (error) return res.status(400).json({ message: error });


        new UpdateStudentUseCase( this.studentRepository ).execute( optionalStudentDto! )
            .then( student => res.json( student ) )
            .catch( error => handleError( error, res ) );
    }

    getStudentByIdUser = async(req: Request, res: Response) => {
        const { id } = req.params;
        new GetStudentByIdUseCase( this.studentRepository ).execute( id )
            .then( student => res.json( student ) )
            .catch( error => handleError( error, res ) );
    }
}