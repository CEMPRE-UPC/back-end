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
exports.AreaInterestDataSource = void 0;
const domain_1 = require("../../../../domain");
const mysqldb_1 = require("../../../../data/mysqldb");
const mappers_1 = require("../../../mappers");
class AreaInterestDataSource {
    register(areaInterestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, studentId } = areaInterestDto;
            try {
                const areaInterest = mysqldb_1.AreaInterestModel.build({
                    description,
                    studentId
                });
                const savedAreaInterest = yield areaInterest.save();
                return mappers_1.AreaInterestMapper.areaInterestEntityFromObject(savedAreaInterest.toJSON());
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
    update(optAreaInterestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, description, studentId } = optAreaInterestDto;
            try {
                const exist = yield mysqldb_1.AreaInterestModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('not found area interest');
                }
                const areaInterest = yield mysqldb_1.AreaInterestModel.update({
                    description
                }, { where: { id, studentId } });
                return areaInterest.at(0) === 1;
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
                const areaInterest = yield mysqldb_1.AreaInterestModel.findOne({ where: { studentId } });
                if (!areaInterest)
                    return null;
                return mappers_1.AreaInterestMapper.areaInterestEntityFromObject(areaInterest.toJSON());
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
                const deleted = yield mysqldb_1.AreaInterestModel.destroy({ where: { id } });
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
exports.AreaInterestDataSource = AreaInterestDataSource;
