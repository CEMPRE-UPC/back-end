import { Router } from 'express';
import { PracticeApplicationController } from './controller';
import { PracticeApplicationRepository } from '../../infrastructure/repositories';
import { PracticeApplicationDataSource, StudentDataSource } from '../../infrastructure/datasources';
import { StudentRepository } from '../../infrastructure/repositories/student/student.repository';
import { StudentMiddleware } from '../middlewares';


export class PracticeAppicationRouter {

    static get routes(): Router {

        const router = Router();

        const studentRepository = new StudentRepository(new StudentDataSource())
        const studentMiddleware = new StudentMiddleware(studentRepository);

        const repository = new PracticeApplicationRepository( new PracticeApplicationDataSource() );
        const controller = new PracticeApplicationController( repository );

        router.post('/', studentMiddleware.notfoundStudent, controller.register);
        router.get('/:studentId', controller.getByStudentId);

        return router;
    }
}