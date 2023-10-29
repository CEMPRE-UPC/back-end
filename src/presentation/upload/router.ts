import { Router } from 'express';
import { UploadController } from './controller';
import { StudentDataSource, UploadDataSource } from '../../infrastructure/datasources';
import { StudentRepository, UploadRepository } from '../../infrastructure/repositories';
import { UploadMiddleware } from '../middlewares';

export class UploadRouter {

    static get routes(): Router {

        const router = Router();

        const studentRepository = new StudentRepository(new StudentDataSource())

        const uploadRepository = new UploadRepository(new UploadDataSource());
        const controller = new UploadController(uploadRepository);

        const middleware = new UploadMiddleware(studentRepository, uploadRepository);

        router.post('/', 
            middleware.validateStudent,
            middleware.validateFile,
        controller.saveFile);

        router.get('/:studentId', controller.getFilesOfStudent);

        router.get('/:table/:id', controller.getFile)

        router.patch('/', 
         middleware.validateStudent,
        controller.updateFile);

        return router;
    }
}