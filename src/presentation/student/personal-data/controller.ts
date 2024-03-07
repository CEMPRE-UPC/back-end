import { Request, Response,  } from 'express'
import { IStudentRepository, OptionalStudentDto, RegisterStudentUseCase, StudentDto } from '../../../domain'
import { handleError } from '../../helpers';
import { UpdateStudentUseCase, GetStudentByIdUseCase, GetStudentByCedulaUseCase, DeleteUseCase, GetAllStudentsUseCase } from '../../../domain/use-cases';

export class StudentController {

    constructor(
        private readonly studentRepository: IStudentRepository
    ) { }   

    register = async(req: Request, res: Response) => {

        const [ error, studentDto] = StudentDto.create(req.body);
        console.log(error);
        
        if (error) return res.status(400).json({ message: error });

   
        new RegisterStudentUseCase( this.studentRepository ).execute( studentDto! )
            .then( student => res.json( student ) )
            .catch( error => handleError( error, res ) );
    }

    update = async(req: Request, res: Response) => {
        

        const { cedula } = req.params || req.body;

        const [ error, optionalStudentDto] = OptionalStudentDto.create(req.body, cedula);
        if (error) return res.status(400).json({ message: error });


        new UpdateStudentUseCase( this.studentRepository ).execute( optionalStudentDto! )
            .then( student => res.json( student ) )
            .catch( error => handleError( error, res ) );
    }

    getStudentByIdUser = async(req: Request, res: Response) => {
        console.log('siuu');
        
        const { id } = req.params;
        new GetStudentByIdUseCase( this.studentRepository ).execute( id )
            .then( student => res.json( student ) )
            .catch( error => handleError( error, res ) );
    }

    getStudentByCedula = async(req: Request, res: Response) => {
        
        const { cedula } = req.params;
        new GetStudentByCedulaUseCase( this.studentRepository ).execute( cedula )
            .then( student => res.json( student ) )
            .catch( error => handleError( error, res ) );
    }

    getAllStudents = async(req: Request, res: Response) => {
        
        const { modality } = req.params;
        
        new GetAllStudentsUseCase( this.studentRepository ).execute(modality)
            .then( students => res.json( students ) )
            .catch( error => handleError( error, res ) );
    }

    delete = async(req: Request, res: Response) => {
        
        const { id } = req.params;

        new DeleteUseCase( this.studentRepository ).execute(id)
        .then( student => res.json( student ) )
        .catch( error => handleError( error, res ) );
    }
}