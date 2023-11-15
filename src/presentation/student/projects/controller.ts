import { Request, Response } from 'express';
import { IProjectsRepository } from '../../../domain';
import { OptionalProjectsDto, ProjectsDto } from '../../../domain/dtos/student';
import { GetProjectsUseCase, RegisterUseCase, UpdateUseCase, } from '../../../domain/use-cases/student/projects';
import { handleError } from '../../helpers';


export class ProjectsController {

    constructor(
        private readonly projectsRepository: IProjectsRepository
    ) {}

    register = (req: Request, res: Response) => {

        const [ error, projectsDto ] = ProjectsDto.create(req.body);

        if(error) return res.status(400).json({ message: error });

        new RegisterUseCase(this.projectsRepository).execute(projectsDto!)
            .then(project => res.status(201).json(project))
            .catch( error => handleError(error, res) );
    }

    update = (req: Request, res: Response) => {

        const { id } = req.params;
        const [ error, optProjectsDto ] = OptionalProjectsDto.create(req.body, id);

        if(error) return res.status(400).json({ message: error });

        new UpdateUseCase(this.projectsRepository).execute(optProjectsDto!)
            .then( updated => res.status(200).json(updated) )
            .catch( error => handleError(error, res) );
    }

    getByStudentId = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new GetProjectsUseCase(this.projectsRepository).execute(studentId)
            .then( projects => res.status(200).json(projects) )
            .catch( error => handleError(error, res) );
    }
}