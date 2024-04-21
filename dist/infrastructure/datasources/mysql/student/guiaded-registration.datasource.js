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
exports.GuiadedRegistrationDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class GuiadedRegistrationDataSource {
    register(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guiadedRegistration = yield mysqldb_1.GuiadedRegistrationModel.create({ studentId });
                return mappers_1.GuiadedRegistrationMapper.guiadedRegistrationEntityFromObject(guiadedRegistration);
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
            console.log('siuuuuuu :v', studentId);
            try {
                const guiadedRegistration = yield mysqldb_1.GuiadedRegistrationModel.findOne({ where: { studentId } });
                if (!guiadedRegistration)
                    return null;
                return mappers_1.GuiadedRegistrationMapper.guiadedRegistrationEntityFromObject(guiadedRegistration.toJSON());
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
    delete(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield mysqldb_1.GuiadedRegistrationModel.destroy({ where: { studentId } });
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
exports.GuiadedRegistrationDataSource = GuiadedRegistrationDataSource;
