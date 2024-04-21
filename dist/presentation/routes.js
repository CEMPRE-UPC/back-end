"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
const upload_1 = require("./upload");
const personal_data_1 = require("./student/personal-data");
const routes_1 = require("./student/practice/routes");
const work_experience_1 = require("./student/work-experience");
const language_1 = require("./student/language");
const university_studies_1 = require("./student/university-studies");
const applied_studies_1 = require("./student/applied-studies");
const projects_1 = require("./student/projects");
const knowledge_1 = require("./student/knowledge");
const area_interest_1 = require("./student/area-interest");
const seminars_courses_1 = require("./student/seminars-courses");
const guiaded_registration_1 = require("./student/guiaded-registration");
const cempre_admin_1 = require("./cempre-admin");
const practices_1 = require("./practices");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/auth', auth_1.AuthRoutes.routes);
        router.use('/api/upload', upload_1.UploadRouter.routes);
        router.use('/api/student', [
            personal_data_1.StudentRouter.routes,
            routes_1.PracticeRouter.routes,
            work_experience_1.WorkExperienceRouter.routes,
            language_1.LanguageRouter.routes,
            university_studies_1.UniversityStudiesRouter.routes,
            applied_studies_1.AppliedStudiesRouter.routes,
            projects_1.ProjectsRouter.routes,
            knowledge_1.KnowledgeRouter.routes,
            area_interest_1.AreaInterestRouter.routes,
            seminars_courses_1.SeminarsOrCoursesRouter.routes,
            guiaded_registration_1.GuiadedRegistrationRouter.routes
        ]);
        router.use('/api/company', cempre_admin_1.CompanyRouter.router);
        router.use('/api/practice-application', practices_1.PracticeAppicationRouter.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
