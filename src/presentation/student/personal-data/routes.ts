import { Router } from 'express';
import { StudentController } from './controller';
import { AuthDataSource, StudentDataSource } from '../../../infrastructure/datasources';
import { AuthRepository, StudentRepository } from '../../../infrastructure/repositories';
import { StudentMiddleware } from '../../middlewares';




export class StudentRouter {

    static get routes(): Router {
    
        const router = Router();

        const datasource = new StudentDataSource();
        const repository = new StudentRepository( datasource );
        const controller = new StudentController( repository );

        const middleware = new StudentMiddleware( repository );

        router.post('/personal-data',middleware.existStudent, controller.register);
        router.patch('/personal-data/:cedula',middleware.notfoundStudent, controller.update);
        router.get('/personal-data/:id', controller.getStudentByIdUser);
        router.get('/personal-data/:id', controller.delete);

        return router;
    
    }
}