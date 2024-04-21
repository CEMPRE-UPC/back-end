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
exports.PracticeDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class PracticeDataSource {
    getPracticeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const practice = yield mysqldb_1.PracticeModel.findByPk(id);
                if (!practice)
                    return null;
                return mappers_1.PracticeMapper.practiceEntityFromObject(practice);
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
    getAllPractices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const practices = yield mysqldb_1.PracticeModel.findAll();
                if (!practices)
                    return null;
                return practices.map(mappers_1.PracticeMapper.practiceEntityFromObject);
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
                const practice = yield mysqldb_1.PracticeModel.destroy({ where: { id } });
                return practice === 1;
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
exports.PracticeDataSource = PracticeDataSource;
