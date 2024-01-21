import { Request, Response } from 'express';
import { IUniversityStudiesRepository, OptionalUniversityStudiesDto, UniversityStudiesDto } from '../../../domain';
import { RegisterUseCase, UpdateUseCase, GetByStudentIdUseCase, DeleteUseCase } from '../../../domain/use-cases/student/university-studies';
import { handleError } from '../../helpers';



export class UniversityStudiesController {

    constructor(
        private readonly universityStudiesRepository: IUniversityStudiesRepository
    ) {}

    register = (req: Request, res: Response) => {

        const [ error, universityStudiesDto ] = UniversityStudiesDto.create(req.body);

        if(error) return res.status(400).json({ message: error });

        new RegisterUseCase(this.universityStudiesRepository).execute(universityStudiesDto!)
            .then(universityStudies => res.status(201).json(universityStudies))
            .catch(error => handleError(error, res));
    }

    update = (req: Request, res: Response) => {

        const [ error, optUniversityStudiesDto ] = OptionalUniversityStudiesDto.create( req.body, req.params.id );

        if(error) return res.status(400).json({ message: error });

        new UpdateUseCase(this.universityStudiesRepository).execute(optUniversityStudiesDto!)
            .then(universityStudies => res.status(200).json(universityStudies))
            .catch(error => handleError(error, res));
    }

    getByStudentId = (req: Request, res: Response) => {

        const studentId = req.params.studentId;

        new GetByStudentIdUseCase( this.universityStudiesRepository ).execute( studentId )
        .then( universityStudies => res.status( 200 ).json( universityStudies ) )
        .catch( error => handleError( error, res ) );
    }

    delete = (req: Request, res: Response) => {

        const { id } = req.params;

        new DeleteUseCase( this.universityStudiesRepository ).execute( id )
        .then( deleted => res.status( 200 ).json( deleted ) )
        .catch( error => handleError( error, res ) );
    }
}