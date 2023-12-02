import { Request, Response } from 'express';
import { ISeminarsOrCoursesRepository, OptionalSeminarsOrCoursesDto, SeminarsOrCoursesDto } from '../../../domain';
import { RegisterUseCase, UpdateUseCase, GetByStudentIdUseCase } from '../../../domain/use-cases/student/seminars-courses';
import { handleError } from '../../helpers';


export class SeminarsOrCoursesController {
    
    constructor(
        private readonly seminarsOrCoursesRepository: ISeminarsOrCoursesRepository
    ) {}
    
    
    register = (req: Request, res: Response) => {

        const [ error, seminarsOrCoursesDto ] = SeminarsOrCoursesDto.create(req.body);

        if (error) return res.status(400).json({ message: error });

        new RegisterUseCase( this.seminarsOrCoursesRepository ).execute(seminarsOrCoursesDto!)
            .then(seminarsOrCoursesEntity => res.status(201).json(seminarsOrCoursesEntity))
            .catch(err => handleError( err, res ));
       
    }

    update = (req: Request, res: Response) => {

        const { id } = req.params;

        const [ error, optSeminarsOrCoursesDto ] = OptionalSeminarsOrCoursesDto.create(req.body, id);

        if (error) return res.status(400).json({ message: error });

        new UpdateUseCase( this.seminarsOrCoursesRepository ).execute(optSeminarsOrCoursesDto!)
            .then(result => res.status(200).json(result))
            .catch(err => handleError( err, res ));
       
    }

    getByStudentId = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new GetByStudentIdUseCase( this.seminarsOrCoursesRepository ).execute(studentId)
            .then(seminarsOrCourses => res.status(200).json(seminarsOrCourses))
            .catch(err => handleError( err, res ));
       
    }


}