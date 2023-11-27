import { Router } from 'express';
import { UploadController } from './controller';
import { AuthDataSource, StudentDataSource, UploadDataSource } from '../../infrastructure/datasources';
import { AuthRepository, StudentRepository, UploadRepository } from '../../infrastructure/repositories';
import { AuthMiddleware, StudentMiddleware, UploadMiddleware } from '../middlewares';

export class UploadRouter {

    static get routes(): Router {

        const router = Router();

        const studentRepository = new StudentRepository(new StudentDataSource())
        const uploadRepository = new UploadRepository(new UploadDataSource());
        const authRepository = new AuthRepository( new AuthDataSource());


        const uploadController = new UploadController(uploadRepository);

        const studentMiddleware = new StudentMiddleware(studentRepository);
        const uploadMiddleware = new UploadMiddleware(uploadRepository);
        const authMiddleware = new AuthMiddleware( authRepository );

        router.post('/', 
            authMiddleware.validateJWT,
            studentMiddleware.existStudent,
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
            studentMiddleware.existStudent,
        uploadController.updateFile);

        return router;
    }
}