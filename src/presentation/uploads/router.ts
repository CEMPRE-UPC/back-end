import { Router } from 'express';
import { UploadController } from './controller';

export class UploadRouter {


    static get routes(): Router {

        const router = Router();


        const controller = new UploadController();

        router.post('/:table/:id', controller.loadFile);

        return router;
    }
}