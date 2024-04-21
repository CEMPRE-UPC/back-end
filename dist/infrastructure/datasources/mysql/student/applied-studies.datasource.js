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
exports.AppliedStudiesDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class AppliedStudiesDataSource {
    register(appliedStudiesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { level, institution, collegeDegree, date, studentId } = appliedStudiesDto;
            try {
                const appliedStudies = mysqldb_1.AppliedStudiesModel.build({
                    level,
                    institution,
                    collegeDegree,
                    date,
                    studentId
                });
                const savedAppliedStudies = yield appliedStudies.save();
                return mappers_1.AppliedStudiesMapper.appliedStudiesEntityFromObject(savedAppliedStudies);
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
    update(optAppliedStudiesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, level, institution, collegeDegree, date, studentId } = optAppliedStudiesDto;
            try {
                const exist = yield mysqldb_1.AppliedStudiesModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('University studies not found');
                }
                const appliedStudies = yield mysqldb_1.AppliedStudiesModel.update({
                    level,
                    institution,
                    collegeDegree,
                    date,
                }, { where: { id, studentId } });
                return appliedStudies.at(0) === 1;
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
                const appliedStudies = yield mysqldb_1.AppliedStudiesModel.findAll({ where: { studentId } });
                if (!appliedStudies) {
                    return null;
                }
                return appliedStudies.map(mappers_1.AppliedStudiesMapper.appliedStudiesEntityFromObject);
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
            console.log(id);
            try {
                const appliedStudies = yield mysqldb_1.AppliedStudiesModel.findByPk(id);
                if (!appliedStudies) {
                    return null;
                }
                return mappers_1.AppliedStudiesMapper.appliedStudiesEntityFromObject(appliedStudies);
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
                const deleted = yield mysqldb_1.AppliedStudiesModel.destroy({ where: { id } });
                return deleted === 1;
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
exports.AppliedStudiesDataSource = AppliedStudiesDataSource;
