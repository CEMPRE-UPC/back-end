import { Router } from 'express';
import { AreaInterestRepository } from '../../../infrastructure/repositories';
import { AreaInterestDataSource } from '../../../infrastructure/datasources';
import { AreaInterestController } from './controller';


export class AreaInterestRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new AreaInterestRepository( new AreaInterestDataSource() );
        const controller = new AreaInterestController( repository );

        router.post('/area-interest', controller.register);
        router.patch('/area-interest/:id', controller.update);
        router.get('/area-interest/:studentId', controller.getByStudentId);

        return router;
    }
}