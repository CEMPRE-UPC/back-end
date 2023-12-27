import { Router } from 'express';
import { LanguageController } from './controller';
import { LanguageRepository } from '../../../infrastructure/repositories';
import { LanguageDataSource } from '../../../infrastructure/datasources';
import { LanguageMiddleware } from '../../middlewares';


export class LanguageRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new LanguageRepository( new LanguageDataSource() )
        const controller = new LanguageController( repository );

        const middleware = new LanguageMiddleware( repository );


        router.post('/language', middleware.existLanguage, controller.register);
        router.patch('/language/:id', controller.update);
        router.get('/language/all/:studentId', controller.getLanguagesByStudentId);
        router.get('/language/:id', controller.getLanguageById);
        router.delete('/language/:id', controller.delete);

        return router;
    }
}