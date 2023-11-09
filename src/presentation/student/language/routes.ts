import { Router } from 'express';
import { LanguageController } from './controller';
import { LanguageRepository } from '../../../infrastructure/repositories';
import { LanguageDataSource } from '../../../infrastructure/datasources';


export class LanguageRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new LanguageRepository( new LanguageDataSource() )
        const controller = new LanguageController( repository );

        router.post('/language', controller.register);
        router.patch('/language/:id', controller.update);
        router.get('/language/:studentId', controller.getLanguagesByStudentId);

        return router;
    }
}