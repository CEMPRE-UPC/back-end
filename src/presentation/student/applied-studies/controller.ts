import { Request, Response } from 'express';
import { IAppliedStudiesRepository, OptionalAppliedStudiesDto } from '../../../domain';
import { AppliedStudiesDto } from '../../../domain/dtos/student/applied-studies/applied-studies.dto';
import { RegisterUseCase, UpdateUseCase, GetByStudentIdUseCase, DeleteUseCase, GetByIdUseCase } from '../../../domain/use-cases/student/applied-studies';
import { handleError } from '../../helpers';


export class AppliedStudiesController {

    constructor(
        private readonly appliedStudiesRepository: IAppliedStudiesRepository
    ) {}

    register = (req: Request, res: Response) => {

        const [ error, appliedStudiesDto] = AppliedStudiesDto.create(req.body);
        if(error) return res.status(400).json({ message: error });

        new RegisterUseCase( this.appliedStudiesRepository ).execute(appliedStudiesDto!)
            .then( appliedStudies => res.status(201).json(appliedStudies) )
            .catch( error => handleError(error, res))
    }

    update = (req: Request, res: Response) => {

        const { id } = req.params;
        const [ error, optAppliedStudiesDto ] = OptionalAppliedStudiesDto.create(req.body, id);

        if(error) return res.status(400).json({ message: error });

        new UpdateUseCase( this.appliedStudiesRepository ).execute(optAppliedStudiesDto!)
            .then( appliedStudies => res.status(201).json(appliedStudies) )
            .catch( error => handleError(error, res));
    }

    getByIdStudent = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new GetByStudentIdUseCase( this.appliedStudiesRepository ).execute(studentId)
            .then( appliedStudies => res.status(200).json(appliedStudies) )
            .catch( error => handleError(error, res));
    }

    getById = (req: Request, res: Response) => {

        const { id } = req.params;

        new GetByIdUseCase( this.appliedStudiesRepository ).execute(id)
            .then( appliedStudies => res.status(200).json(appliedStudies) )
            .catch( error => handleError(error, res));
    }

    delete = (req: Request, res: Response) => {

        const { id } = req.params;

        new DeleteUseCase( this.appliedStudiesRepository ).execute(id)
            .then( appliedStudies => res.status(200).json(appliedStudies) )
            .catch( error => handleError(error, res));
    }


}