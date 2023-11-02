import { Router } from 'express';
import { PracticeRepository } from '../../../infrastructure/repositories';
import { PracticeDataSource } from '../../../infrastructure/datasources';
import { PracticeController } from './controller';



export class PracticeRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new PracticeRepository( new PracticeDataSource() );

        // comprobar si repository es undefined

        if (repository === undefined) {
            throw new Error('repository must not be undefined');
        }

        
        const controller = new PracticeController( repository );

        router.post('/practice', controller.register);
        router.patch('/practice', controller.update);
        router.get('/practice/:studentId', controller.getByStudentId);

        return router;
    }
}