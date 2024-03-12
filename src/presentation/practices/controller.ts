
import { Request, Response } from 'express';
import { IPracticeApplicationRepository } from '../../domain/repositories/practices/practice-application.repository';
import { handleError } from '../helpers';
import { OptionalPracticeApplicationDto, PracticeAppRegisterUseCase, PracticeAppGetByStudentIdUseCase, PracticeAppGetByIdUseCase, PracticeAppUpdateUseCase } from '../../domain';


export class PracticeApplicationController {

    constructor(
        private readonly practiceApplicationRepository: IPracticeApplicationRepository
    ) { }

    register = (req: Request, res: Response) => {

        const { studentId } = req.body;

        new PracticeAppRegisterUseCase(this.practiceApplicationRepository).execute(Number(studentId))
        .then(result => res.status(201).json({ result }))
        .catch(error => handleError(error, res));

    }

    update = (req: Request, res: Response) => {

        const { id } = req.params;
        const [error, optionalPracticeApplicationDto] = OptionalPracticeApplicationDto.create(req.body, id);

        if (error) return res.status(400).json({ message: error });

        new PracticeAppUpdateUseCase(this.practiceApplicationRepository).execute(optionalPracticeApplicationDto!)
            .then(result => res.json({ result }))
            .catch(error => handleError(error, res));
    }

    getByStudentId = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new PracticeAppGetByStudentIdUseCase(this.practiceApplicationRepository).execute(Number(studentId))
            .then(result => res.json({ result }))
            .catch(error => handleError(error, res));
    }

    getById = (req: Request, res: Response) => {

        const { id } = req.params;

        new PracticeAppGetByIdUseCase(this.practiceApplicationRepository).execute(id)
            .then(result => res.json({ result }))
            .catch(error => handleError(error, res));
    }
}