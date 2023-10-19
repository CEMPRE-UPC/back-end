import { Router } from 'express';
import { AuthRoutes } from './auth';
import { UploadRouter } from './uploads';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/upload', UploadRouter.routes);


        return router;
    } 
}