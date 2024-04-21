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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeApplicationDataSource = void 0;
const sequelize_1 = require("sequelize");
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class PracticeApplicationDataSource {
    register(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const practiceApplication = yield mysqldb_1.PracticeApplicationModel.create({ studentId });
                console.log(practiceApplication.toJSON());
                return mappers_1.PracticeApplicationMapper.practiceApplicationEntityFromObject(practiceApplication.toJSON());
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                if (error instanceof sequelize_1.ValidationError) {
                    const errors = mappers_1.SequelizeErrorMapper.customErrorFromObject(error);
                    const { msg, field } = errors[0];
                    throw domain_1.CustomError.badRequest(`${msg} in field ${field}`);
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    update(optPracticeApplicationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, studentId } = optPracticeApplicationDto, rest = __rest(optPracticeApplicationDto, ["id", "studentId"]);
                const practiceApplication = yield mysqldb_1.PracticeApplicationModel.update(rest, { where: { id, studentId } });
                return practiceApplication.at(0) === 1;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                if (error instanceof sequelize_1.ValidationError) {
                    const errors = mappers_1.SequelizeErrorMapper.customErrorFromObject(error);
                    const { msg, field } = errors[0];
                    throw domain_1.CustomError.badRequest(`${msg} in field ${field}`);
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getByIdStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const practiceApplication = yield mysqldb_1.PracticeApplicationModel.findOne({ where: { studentId } });
                if (!practiceApplication)
                    return null;
                return mappers_1.PracticeApplicationMapper.practiceApplicationEntityFromObject(practiceApplication.toJSON());
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                if (error instanceof sequelize_1.ValidationError) {
                    const errors = mappers_1.SequelizeErrorMapper.customErrorFromObject(error);
                    const { msg, field } = errors[0];
                    throw domain_1.CustomError.badRequest(`${msg} in field ${field}`);
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getById(id) {
        throw new Error('Method not implemented.');
    }
}
exports.PracticeApplicationDataSource = PracticeApplicationDataSource;
