import { Router } from 'express';
import { ObservationDatasource } from '../../../infrastructure/datasources';
import { ObservationRepository } from '../../../infrastructure/repositories';
import { ObservationController } from './controller';


export class ObservationRouter {

    static get routes(): Router {


        const router = Router();

        const repository = new ObservationRepository( new ObservationDatasource() );
        const controller = new ObservationController( repository );

        router.post('/', controller.register);

        return router;
    }
}