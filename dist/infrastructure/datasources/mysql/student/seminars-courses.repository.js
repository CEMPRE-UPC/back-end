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
exports.SeminarsOrCoursesDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const seminars_courses_1 = require("../../../mappers/student/seminars-courses");
class SeminarsOrCoursesDataSource {
    register(seminarsOrCoursesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topic, institution, date, studentId } = seminarsOrCoursesDto;
            try {
                const seminarOrCourse = mysqldb_1.SeminarsOrCoursesModel.build({
                    topic,
                    institution,
                    date,
                    studentId
                });
                const savedSeminarOrCourse = yield seminarOrCourse.save();
                return seminars_courses_1.SeminarsOrCoursesMapper.seminarsOrCoursesEntityFromObject(savedSeminarOrCourse.toJSON());
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
    update(optSeminarOrCourses) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, topic, institution, date, studentId } = optSeminarOrCourses;
            try {
                const exist = yield mysqldb_1.SeminarsOrCoursesModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('Seminar or course not found');
                }
                const seminarOrCourse = yield mysqldb_1.SeminarsOrCoursesModel.update({
                    topic,
                    institution,
                    date
                }, { where: { id, studentId } });
                return seminarOrCourse.at(0) === 1;
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
    getByIdStudent(idStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seminarsOrCourses = yield mysqldb_1.SeminarsOrCoursesModel.findAll({ where: { studentId: idStudent } });
                if (!seminarsOrCourses)
                    return null;
                return seminarsOrCourses.map(seminars_courses_1.SeminarsOrCoursesMapper.seminarsOrCoursesEntityFromObject);
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
                const seminarOrCourse = yield mysqldb_1.SeminarsOrCoursesModel.findByPk(id);
                if (!seminarOrCourse)
                    return null;
                return seminars_courses_1.SeminarsOrCoursesMapper.seminarsOrCoursesEntityFromObject(seminarOrCourse.toJSON());
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
                const seminarOrCourse = yield mysqldb_1.SeminarsOrCoursesModel.destroy({ where: { id } });
                return seminarOrCourse === 1;
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
exports.SeminarsOrCoursesDataSource = SeminarsOrCoursesDataSource;
