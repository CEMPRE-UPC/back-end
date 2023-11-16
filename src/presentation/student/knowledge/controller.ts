import { Request, Response } from 'express';
import { IKnowledgeRepository } from '../../../domain';
import { KnowledgeDto, OptionalKnowledgeDto } from '../../../domain/dtos/student';
import { GetKnowledgeUseCase, RegisterUseCase, UpdateUseCase, } from '../../../domain/use-cases/student/knowledge';
import { handleError } from '../../helpers';


export class KnowledgeController {

    constructor(
        private readonly knowledgeReposotory: IKnowledgeRepository
    ) {}

    register = (req: Request, res: Response) => {

        const [ error, knowledgeDto ] = KnowledgeDto.create(req.body);

        console.log(knowledgeDto);
        

        if(error) return res.status(400).json({ message: error });

        new RegisterUseCase(this.knowledgeReposotory).execute(knowledgeDto!)
            .then(project => res.status(201).json(project))
            .catch( error => handleError(error, res) );
    }

    update = (req: Request, res: Response) => {

        const { id } = req.params;
        const [ error, optKnowledgeDto ] = OptionalKnowledgeDto.create(req.body, id);

        if(error) return res.status(400).json({ message: error });

        new UpdateUseCase(this.knowledgeReposotory).execute(optKnowledgeDto!)
            .then( updated => res.status(200).json(updated) )
            .catch( error => handleError(error, res) );
    }

    getByStudentId = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new GetKnowledgeUseCase(this.knowledgeReposotory).execute(studentId)
            .then( projects => res.status(200).json(projects) )
            .catch( error => handleError(error, res) );
    }
}