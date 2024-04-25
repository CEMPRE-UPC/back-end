import { Router } from 'express';
import { AuthRoutes } from './auth';
import { UploadRouter } from './upload/attached-files';
import { StudentRouter } from './student/personal-data';
import { PracticeRouter } from './student/practice/routes';
import { WorkExperienceRouter } from './student/work-experience';
import { LanguageRouter } from './student/language';
import { UniversityStudiesRouter } from './student/university-studies';
import { AppliedStudiesRouter } from './student/applied-studies';
import { ProjectsRouter } from './student/projects';
import { KnowledgeRouter } from './student/knowledge';
import { AreaInterestRouter } from './student/area-interest';
import { SeminarsOrCoursesRouter } from './student/seminars-courses';
import { GuiadedRegistrationRouter } from './student/guiaded-registration';
import { CompanyRouter } from './cempre-admin';
import { PracticeAppicationRouter } from './practices';
import { PublicFileRouter } from './upload';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/upload', UploadRouter.routes);
        router.use('/api/public-files', PublicFileRouter.routes);
        router.use('/api/student',[ 
            StudentRouter.routes, 
            PracticeRouter.routes, 
            WorkExperienceRouter.routes,
            LanguageRouter.routes, 
            UniversityStudiesRouter.routes,
            AppliedStudiesRouter.routes,
            ProjectsRouter.routes,
            KnowledgeRouter.routes,
            AreaInterestRouter.routes,
            SeminarsOrCoursesRouter.routes,
            GuiadedRegistrationRouter.routes
        ]);
        router.use('/api/company', CompanyRouter.router);
        router.use('/api/practice-application', PracticeAppicationRouter.routes)

        return router;
    } 
}