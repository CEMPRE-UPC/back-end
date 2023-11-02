import { Router } from 'express';
import { AuthRoutes } from './auth';
import { UploadRouter } from './upload';
import { StudentRouter } from './student/personal-data';
import { PracticeRouter } from './student/practice/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/upload', UploadRouter.routes);
        router.use('/api/student', StudentRouter.routes, PracticeRouter.routes);

        return router;
    } 
}