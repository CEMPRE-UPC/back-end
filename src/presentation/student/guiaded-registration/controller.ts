import { Request, Response } from 'express';
import {  IGuiadedRegistrationRepository } from '../../../domain';
import { RegisterUseCase, DeleteUseCase, GetGuiadedRegistrationUseCase } from '../../../domain/use-cases/student/guiaded-registration';
import { handleError } from '../../helpers';


export class GuiadedRegistrationController {

    constructor(
        private readonly guiadedRegistrationRepository: IGuiadedRegistrationRepository
    ) {}

    register = (req: Request, res: Response) => {

        const { studentId } = req.body;

        new RegisterUseCase(this.guiadedRegistrationRepository).execute(Number(studentId))
            .then( guiadedRegistration => res.status(200).json(guiadedRegistration) )
            .catch( error => handleError(error, res) );
    }

    delete = (req: Request, res: Response) => {
            
        const { studentId } = req.params;

        new DeleteUseCase(this.guiadedRegistrationRepository).execute(Number(studentId))
            .then( deleted => res.status(200).json(deleted ) )
            .catch( error => handleError(error, res) );

    }

    getByStudentId = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new GetGuiadedRegistrationUseCase(this.guiadedRegistrationRepository).execute(Number(studentId))
            .then( guiadedRegistration => res.status(200).json(guiadedRegistration) )
            .catch( error => handleError(error, res) );
    }
}