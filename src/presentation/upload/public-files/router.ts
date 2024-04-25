import { Router } from 'express';
import { PublicFileController } from './controller';
import { AuthDataSource, PublicFileDataSource } from '../../../infrastructure/datasources';
import { AuthRepository } from '../../../infrastructure/repositories';
import { AuthMiddleware, PublicFileMiddleware } from '../../middlewares';
import { PublicFileRepository } from '../../../infrastructure/repositories/upload/public-file.repository';

export class PublicFileRouter {

    static get routes(): Router {

        const router = Router();

        const publicFileRepository = new PublicFileRepository(new PublicFileDataSource());
        const authRepository = new AuthRepository( new AuthDataSource());


        const publicFileController = new PublicFileController(publicFileRepository);

        const publicFileMiddleware = new PublicFileMiddleware(publicFileRepository);
        const authMiddleware = new AuthMiddleware( authRepository );

        router.post('/', 
            authMiddleware.validateJWT,
            publicFileMiddleware.validateFile,
        publicFileController.saveFile);

        router.get('/', 
            authMiddleware.validateJWT,
        publicFileController.getFiles);

        router.get('/:table/:id',
            authMiddleware.validateJWT,
        publicFileController.getFile)

        router.get('/by-type/:table/:typeFile',
        publicFileController.getFileByType)

        

        router.patch('/', 
            authMiddleware.validateJWT,
        publicFileController.updateFile);

        return router;
    }
}