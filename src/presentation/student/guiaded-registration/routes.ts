import { Router } from 'express';
import { GuiadedRegistrationRepository, StudentRepository } from '../../../infrastructure/repositories';
import { GuiadedRegistrationDataSource, StudentDataSource } from '../../../infrastructure/datasources';
import { GuiadedRegistrationController } from './controller';
import { StudentMiddleware } from '../../middlewares';


export class GuiadedRegistrationRouter {

    static get routes(): Router {

        const router = Router();

        const studentRepository = new StudentRepository(new StudentDataSource())

        const repository = new GuiadedRegistrationRepository( new GuiadedRegistrationDataSource() );
        const controller = new GuiadedRegistrationController( repository );

        const studentMiddleware = new StudentMiddleware(studentRepository);

        router.post('/guiaded-registration', studentMiddleware.notfoundStudent, controller.register);
        router.delete('/guiaded-registration/:studentId', controller.delete);
        router.get('/guiaded-registration/:studentId', controller.getByStudentId);

        return router;
    }
}