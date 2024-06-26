import { Router } from 'express';
import { StudentController } from './controller';
import { StudentDataSource } from '../../../infrastructure/datasources';
import { StudentRepository } from '../../../infrastructure/repositories';
import { StudentMiddleware } from '../../middlewares';




export class StudentRouter {

    static get routes(): Router {
    
        const router = Router();

        const datasource = new StudentDataSource();
        const repository = new StudentRepository( datasource );
        const controller = new StudentController( repository );

        const middleware = new StudentMiddleware( repository );

        router.post('/personal-data',middleware.existStudent, controller.register);
        router.get('/personal-data/all/', controller.getAllStudents);
        router.patch('/personal-data/:cedula',middleware.notfoundStudent, controller.update);
        router.get('/personal-data/:cedula',middleware.notfoundStudent, controller.getStudentByCedula);
        router.get('/personal-data/user/:id', controller.getStudentByIdUser);
        // router.get('/personal-data/:id', controller.delete);

        return router;
    
    }
}