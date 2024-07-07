import { Router } from 'express';
import { CallDataSource } from '../../infrastructure/datasources';
import { CallRepository } from '../../infrastructure/repositories';
import { CallController } from './controller';



export class CallRouter {

    static get routes(): Router {

        const router = Router();

        const datasource = new CallDataSource();
        const repository = new CallRepository( datasource );
        const controller = new CallController( repository );


        router.post('/', controller.register);
        router.get('/all', controller.getAllCalls);
        router.patch('/:id', controller.update);
        router.get('/:id', controller.getCallById);

        return router;

    }
}