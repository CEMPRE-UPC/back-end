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
exports.WorkExperienceDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class WorkExperienceDataSource {
    register(workExperienceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company, position, functions, startDate, endDate, studentId } = workExperienceDto;
            try {
                const workExperience = mysqldb_1.WorkExperienceModel.build({
                    company,
                    position,
                    functions,
                    startDate,
                    endDate,
                    studentId
                });
                const savedWorkExperience = yield workExperience.save();
                return mappers_1.WorkExperienceMapper.workExperienceEntityFromObject(savedWorkExperience);
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
    update(optWorkExperienceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, company, position, functions, startDate, endDate, studentId } = optWorkExperienceDto;
            try {
                const exist = yield mysqldb_1.WorkExperienceModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('Work experience not found');
                }
                const workExperience = yield mysqldb_1.WorkExperienceModel.update({
                    company,
                    position,
                    functions,
                    startDate,
                    endDate
                }, { where: { id, studentId } });
                console.log(workExperience.at(0));
                return workExperience.at(0) === 1;
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
    getByIdStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workExperiences = yield mysqldb_1.WorkExperienceModel.findAll({ where: { studentId } });
                if (!workExperiences) {
                    return null;
                }
                return workExperiences.map(workExperience => mappers_1.WorkExperienceMapper.workExperienceEntityFromObject(workExperience));
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
                const workExperience = yield mysqldb_1.WorkExperienceModel.findByPk(id);
                if (!workExperience) {
                    return null;
                }
                return mappers_1.WorkExperienceMapper.workExperienceEntityFromObject(workExperience);
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
                const workExperience = yield mysqldb_1.WorkExperienceModel.destroy({ where: { id } });
                return workExperience === 1;
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
exports.WorkExperienceDataSource = WorkExperienceDataSource;
