import { Request, Response } from "express";

import { IObservationRepository, ObservationDto, ObservationRegisterUseCase } from '../../../domain';
import { handleError } from '../../helpers';


export class ObservationController {

    constructor(
        private readonly observationRepository: IObservationRepository
    ) {}
    

    register = (req: Request, res: Response) => {
        const [ error, observationDto ] = ObservationDto.create(req.body);

        if(error) return res.status(400).json({ message: error });

        new ObservationRegisterUseCase(this.observationRepository).execute(observationDto!)
            .then(observation => res.status(201).json(observation))
            .catch( error => handleError(error, res) );
    }
}