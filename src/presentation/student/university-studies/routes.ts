import { Router } from 'express';
import { UniversityStudiesRepository } from '../../../infrastructure/repositories/student/university-studies.repository';
import { UniversityStudiesDataSource } from '../../../infrastructure/datasources';
import { UniversityStudiesController } from './controller';



export class UniversityStudiesRouter {


    static get routes(): Router {

        const router = Router();

        const repository = new UniversityStudiesRepository( new UniversityStudiesDataSource() );

        const controller = new UniversityStudiesController( repository );

        router.post('/university-studies', controller.register);
        router.patch('/university-studies/:id', controller.update);
        router.get('/university-studies/:studentId', controller.getByStudentId);

        return router;
    }
}