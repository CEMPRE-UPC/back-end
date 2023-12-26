import { Request, Response } from 'express';
import { IWorkExperienceRepository, OptionalWorkExperienceDto, WorkExperienceDto } from '../../../domain';
import { GetWorkExperiencesUseCase, RegisterUseCase, UpdateWorkExperienceUseCase, DeleteUseCase } from '../../../domain/use-cases/student/work-experience';
import { handleError } from '../../helpers';


export class WorkExperienceController {

    constructor(
        private readonly workExperienceRepository: IWorkExperienceRepository
    ) {}

    register = ( req: Request, res: Response ) => {

        const [ error, workExperienceDto ] = WorkExperienceDto.create(req.body);

        if(error) return res.status(400).json({ message: error });


        new RegisterUseCase( this.workExperienceRepository ).execute(workExperienceDto!)
            .then( workExperience => res.status(201).json(workExperience) )
            .catch( error => handleError(error, res) );
    } 

    update = ( req: Request, res: Response ) => {
            
            const { id } = req.params;
            const [ error, optWorkExperienceDto ] = OptionalWorkExperienceDto.create(req.body, id);
    
            if(error) return res.status(400).json({ message: error });

            new UpdateWorkExperienceUseCase( this.workExperienceRepository ).execute(optWorkExperienceDto!)
                .then( workExperience => res.status(200).json(workExperience) )
                .catch( error => handleError(error, res) );
    }



    getWorkExperiencesByStudentId = ( req: Request, res: Response ) => {
            
        const { studentId } = req.params;

        new GetWorkExperiencesUseCase( this.workExperienceRepository ).execute(studentId)
            .then( workExperiences => res.status(200).json(workExperiences) )
            .catch( error => handleError(error, res) );
    }

    delete = ( req: Request, res: Response ) => {
            
        const { id } = req.params;

        new DeleteUseCase( this.workExperienceRepository ).execute(id)
            .then( deleted => res.status(200).json(deleted) )
            .catch( error => handleError(error, res) );
    }
}