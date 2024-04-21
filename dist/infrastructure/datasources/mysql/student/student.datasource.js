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
exports.StudentDataSource = void 0;
const domain_1 = require("../../../../domain");
const mysqldb_1 = require("../../../../data/mysqldb");
const mappers_1 = require("../../../mappers");
const sequelize_1 = require("sequelize");
class StudentDataSource {
    register(stundetDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield mysqldb_1.StudentModel.findOne({ where: { cedula: stundetDto.cedula } });
                if (exist)
                    throw domain_1.CustomError.badRequest('Cedula already exists');
                const student = mysqldb_1.StudentModel.build(domain_1.StudentDto.toJSON(stundetDto));
                yield student.save();
                return mappers_1.StudentMapper.studentEntityFromObject(student.toJSON());
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
    update(optStudentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = domain_1.OptionalStudentDto.toJSON(optStudentDto), { cedula } = _a, studentObject = __rest(_a, ["cedula"]);
            console.log(studentObject);
            try {
                const affectedCount = yield mysqldb_1.StudentModel.update(studentObject, { where: { cedula } });
                return affectedCount.at(0) === 1;
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
    getStudentByIdUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield mysqldb_1.StudentModel.findOne({
                    where: { userId: id },
                    include: [
                        {
                            model: mysqldb_1.PracticeModel,
                            attributes: ['modality']
                        },
                        {
                            model: mysqldb_1.PracticeApplicationModel
                        }
                    ]
                });
                if (!student)
                    return student;
                return mappers_1.StudentMapper.studentEntityFromObject(student.toJSON());
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
    getStudentByCedula(cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield mysqldb_1.StudentModel.findOne({
                    where: { cedula },
                    include: [
                        {
                            model: mysqldb_1.PracticeModel,
                            attributes: ['modality']
                        },
                        {
                            model: mysqldb_1.PracticeApplicationModel
                        }
                    ]
                });
                if (!student)
                    return student;
                return mappers_1.StudentMapper.studentEntityFromObject(student.toJSON());
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
    getAllStudents(modality, program) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(program, modality);
            try {
                const students = yield mysqldb_1.StudentModel.findAll({
                    include: [
                        {
                            model: mysqldb_1.UniversityStudiesModel,
                            attributes: ['program'],
                            where: program ? { program } : {}
                        },
                        {
                            model: mysqldb_1.PracticeApplicationModel,
                        },
                        {
                            model: mysqldb_1.PracticeModel,
                            attributes: ['modality'],
                            where: modality ? { modality } : {}
                        }
                    ],
                });
                students.forEach(s => {
                    console.log(s.toJSON());
                });
                if (!students)
                    return students;
                return students.map(student => mappers_1.StudentMapper.studentEntityFromObject(student.toJSON()));
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
                const student = yield mysqldb_1.StudentModel.destroy({ where: { id } });
                return student === 1;
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
exports.StudentDataSource = StudentDataSource;
