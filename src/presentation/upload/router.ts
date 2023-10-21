import { Router } from 'express';
import { UploadController } from './controller';
import { UploadDataSource } from '../../infrastructure/datasources';
import { UploadRepository } from '../../infrastructure/repositories';

export class UploadRouter {


    static get routes(): Router {

        const router = Router();


        const datasource = new UploadDataSource();
        const repository = new UploadRepository(datasource);
        const controller = new UploadController(repository);

        router.post('/', controller.loadFile);

        return router;
    }
}