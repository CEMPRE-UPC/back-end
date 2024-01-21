import { Router } from 'express';
import { SeminarsOrCoursesRepository } from '../../../infrastructure/repositories';
import { SeminarsOrCoursesDataSource } from '../../../infrastructure/datasources';
import { SeminarsOrCoursesController } from './controller';


export class SeminarsOrCoursesRouter {


    static get routes(): Router {

        const router = Router();

        const repository = new SeminarsOrCoursesRepository( new SeminarsOrCoursesDataSource() );
        
        const controller = new SeminarsOrCoursesController( repository );


        router.post('/seminars-courses/', controller.register);
        router.patch('/seminars-courses/:id', controller.update);
        router.get('/seminars-courses/all/:studentId', controller.getByStudentId);
        router.get('/seminars-courses/:id', controller.getById);
        router.delete('/seminars-courses/:id', controller.delete);

        return router;
    }
}