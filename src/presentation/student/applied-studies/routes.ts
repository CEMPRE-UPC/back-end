import { Router } from 'express';
import { AppliedStudiesDataSource } from '../../../infrastructure/datasources';
import { AppliedStudiesRepository } from '../../../infrastructure/repositories';
import { AppliedStudiesController } from './controller';



export class AppliedStudiesRouter {



    static get routes(): Router {

        const router = Router();

        const repository = new AppliedStudiesRepository(new AppliedStudiesDataSource());
        const controller = new AppliedStudiesController(repository);

        router.post('/applied-studies', controller.register);
        router.patch('/applied-studies/:id', controller.update);
        router.get('/applied-studies/:studentId', controller.getByIdStudent);
        router.delete('/applied-studies/:id', controller.delete);

        return router;
    }
}