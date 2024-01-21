import { Request, Response } from 'express';
import { AreaInterestDto, IAreaInterestRepository, OptionalAreaInterestDto } from '../../../domain';
import { RegisterUseCase, UpdateUseCase, GetAreaInterestUseCase, DeleteUseCase } from '../../../domain/use-cases/student/area-interest';
import { handleError } from '../../helpers';


export class AreaInterestController {

    constructor(
        private readonly areaInterestRepository: IAreaInterestRepository
    ) {}

    register = (req: Request, res: Response) => {

        const [ error, areaInterestDto ] = AreaInterestDto.create(req.body);


        if(error) return res.status(400).json({ message: error });

        new RegisterUseCase(this.areaInterestRepository).execute(areaInterestDto!)
            .then( areaInterest => res.status(200).json(areaInterest) )
            .catch( error => handleError(error, res) );
    }

    update = (req: Request, res: Response) => {

        const { id } = req.params;
        const [ error, optAreaInterestDto ] = OptionalAreaInterestDto.create(req.body, id);

        if(error) return res.status(400).json({ message: error });

        new UpdateUseCase(this.areaInterestRepository).execute(optAreaInterestDto!)
            .then( updated => res.status(200).json(updated) )
            .catch( error => handleError(error, res) );
    }

    getByStudentId = (req: Request, res: Response) => {

        const { studentId } = req.params;

        new GetAreaInterestUseCase(this.areaInterestRepository).execute(studentId)
            .then( areaInterest => res.status(200).json(areaInterest) )
            .catch( error => handleError(error, res) );
    }

    delete = (req: Request, res: Response) => {

        const { id } = req.params;

        new DeleteUseCase(this.areaInterestRepository).execute(id)
            .then( deleted => res.status(200).json(deleted) )
            .catch( error => handleError(error, res) );
    }
}