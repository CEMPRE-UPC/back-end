import { Router } from 'express';
import { UploadController } from './controller';
import { AuthDataSource, StudentDataSource, UploadDataSource } from '../../infrastructure/datasources';
import { AuthRepository, StudentRepository, UploadRepository } from '../../infrastructure/repositories';
import { AuthMiddleware, UploadMiddleware } from '../middlewares';

export class UploadRouter {

    static get routes(): Router {

        const router = Router();

        const studentRepository = new StudentRepository(new StudentDataSource())
        const uploadRepository = new UploadRepository(new UploadDataSource());
        const authRepository = new AuthRepository( new AuthDataSource());


        const uploadController = new UploadController(uploadRepository);
        const uploadMiddleware = new UploadMiddleware(studentRepository, uploadRepository);
        const authMiddleware = new AuthMiddleware( authRepository );

        router.post('/', 
            authMiddleware.validateJWT,
            uploadMiddleware.validateStudent,
            uploadMiddleware.validateFile,
        uploadController.saveFile);

        router.get('/:studentId', 
            authMiddleware.validateJWT,
        uploadController.getFilesOfStudent);

        router.get('/:table/:id',
            authMiddleware.validateJWT,
        uploadController.getFile)

        router.patch('/', 
            authMiddleware.validateJWT,
            uploadMiddleware.validateStudent,
        uploadController.updateFile);

        return router;
    }
}