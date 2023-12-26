import { Router } from 'express';
import { PracticeRepository } from '../../../infrastructure/repositories';
import { PracticeDataSource } from '../../../infrastructure/datasources';
import { PracticeController } from './controller';



export class PracticeRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new PracticeRepository( new PracticeDataSource() );


        const controller = new PracticeController( repository );

        router.get('/practice/:id', controller.getPracticeById);
        router.get('/practice', controller.getAllPractices);
        router.get('/practice/:id', controller.delete);

        return router;
    }
}