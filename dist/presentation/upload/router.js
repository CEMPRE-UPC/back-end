"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const datasources_1 = require("../../infrastructure/datasources");
const repositories_1 = require("../../infrastructure/repositories");
const middlewares_1 = require("../middlewares");
class UploadRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const studentRepository = new repositories_1.StudentRepository(new datasources_1.StudentDataSource());
        const uploadRepository = new repositories_1.UploadRepository(new datasources_1.UploadDataSource());
        const authRepository = new repositories_1.AuthRepository(new datasources_1.AuthDataSource());
        const uploadController = new controller_1.UploadController(uploadRepository);
        const studentMiddleware = new middlewares_1.StudentMiddleware(studentRepository);
        const uploadMiddleware = new middlewares_1.UploadMiddleware(uploadRepository);
        const authMiddleware = new middlewares_1.AuthMiddleware(authRepository);
        router.post('/', authMiddleware.validateJWT, studentMiddleware.notfoundStudent, uploadMiddleware.validateFile, uploadController.saveFile);
        router.get('/:studentId', authMiddleware.validateJWT, uploadController.getFilesOfStudent);
        router.get('/:table/:id', authMiddleware.validateJWT, uploadController.getFile);
        router.patch('/', authMiddleware.validateJWT, studentMiddleware.notfoundStudent, uploadController.updateFile);
        return router;
    }
}
exports.UploadRouter = UploadRouter;
