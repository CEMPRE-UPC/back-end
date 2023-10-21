import { Router } from 'express';
import { StudentController } from './controller';
import { AuthDataSource, StudentDataSource } from '../../infrastructure/datasources';
import { AuthRepository, StudentRepository } from '../../infrastructure/repositories';
import { StudentMiddleware } from '../middlewares';




export class StudentRouter {

    static get routes(): Router {
    
        const router = Router();

        const datasource = new StudentDataSource();
        const repository = new StudentRepository( datasource );
        const controller = new StudentController( repository );

        const middleware = new StudentMiddleware( new AuthRepository( new AuthDataSource()) );

        router.post('/',middleware.validateStudent, controller.register)
        router.patch('/:cedula',middleware.validateStudent, controller.update)

        return router;
    
    }
}