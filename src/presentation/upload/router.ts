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

        router.post('/', 
            new UploadMiddleware(studentRepository, uploadRepository).validateStudent,
        controller.saveFile);

        router.get('/:studentId', controller.getFilesOfStudent);

        router.get('/:table/:id', controller.getFile)

        return router;
    }
}