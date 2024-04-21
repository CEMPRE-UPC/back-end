"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class ProjectsDataSource {
    register(projectsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, date, studentId } = projectsDto;
            try {
                const project = mysqldb_1.ProjectsModel.build({
                    description,
                    date,
                    studentId
                });
                const savedProject = yield project.save();
                return mappers_1.ProjectsMapper.projectsEntityFromObject(savedProject.toJSON());
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    update(optProjectsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, description, date, studentId } = optProjectsDto;
            try {
                const exist = yield mysqldb_1.ProjectsModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('Project not found');
                }
                const project = yield mysqldb_1.ProjectsModel.update({
                    description,
                    date
                }, { where: { id, studentId } });
                return project.at(0) === 1;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield mysqldb_1.ProjectsModel.findAll({ where: { studentId } });
                if (!projects) {
                    return null;
                }
                return projects.map(mappers_1.ProjectsMapper.projectsEntityFromObject);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield mysqldb_1.ProjectsModel.findByPk(id);
                if (!project) {
                    return null;
                }
                return mappers_1.ProjectsMapper.projectsEntityFromObject(project);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield mysqldb_1.ProjectsModel.destroy({ where: { id } });
                return project === 1;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.ProjectsDataSource = ProjectsDataSource;
