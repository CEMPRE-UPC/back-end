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
exports.UniversityStudiesDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class UniversityStudiesDataSource {
    register(universityStudiesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { institution, program, semester, studentId } = universityStudiesDto;
            try {
                const universityStudies = mysqldb_1.UniversityStudiesModel.build({
                    institution,
                    program,
                    semester,
                    studentId
                });
                const savedUniversityStudies = yield universityStudies.save();
                return mappers_1.UniversityStudiesMapper.universityStudiesEntityFromObject(savedUniversityStudies);
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
    update(optUniversityStudiesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, institution, program, semester, studentId } = optUniversityStudiesDto;
            try {
                const exist = yield mysqldb_1.UniversityStudiesModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('University studies not found');
                }
                const universityStudies = yield mysqldb_1.UniversityStudiesModel.update({
                    institution,
                    program,
                    semester
                }, { where: { id, studentId } });
                return universityStudies.at(0) === 1;
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
                const universityStudies = yield mysqldb_1.UniversityStudiesModel.findOne({ where: { studentId } });
                if (!universityStudies)
                    return null;
                return mappers_1.UniversityStudiesMapper.universityStudiesEntityFromObject(universityStudies);
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
                const universityStudies = yield mysqldb_1.UniversityStudiesModel.destroy({ where: { id } });
                return universityStudies === 1;
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
exports.UniversityStudiesDataSource = UniversityStudiesDataSource;
