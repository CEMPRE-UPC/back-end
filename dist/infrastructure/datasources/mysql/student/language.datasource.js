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
exports.LanguageDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class LanguageDataSource {
    register(languageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, listeningLevel, readingLevel, speakingLevel, writingLevel, studentId } = languageDto;
            try {
                const language = mysqldb_1.LanguageModel.build({
                    name,
                    listeningLevel,
                    readingLevel,
                    speakingLevel,
                    writingLevel,
                    studentId
                });
                const savedLanguage = yield language.save();
                return mappers_1.LanguageMapper.languageEntityFromObject(savedLanguage);
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
    update(optLanguageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, listeningLevel, readingLevel, speakingLevel, writingLevel, studentId } = optLanguageDto;
            try {
                const exist = mysqldb_1.LanguageModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('Language not found');
                }
                const language = yield mysqldb_1.LanguageModel.update({
                    name,
                    listeningLevel,
                    readingLevel,
                    speakingLevel,
                    writingLevel
                }, { where: { id, studentId } });
                return language.at(0) === 1;
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
                const languages = mysqldb_1.LanguageModel.findAll({ where: { studentId } });
                if (!languages)
                    return null;
                return languages.then((languages) => {
                    return languages.map((language) => mappers_1.LanguageMapper.languageEntityFromObject(language));
                });
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
    getLanguageByName(studentId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const language = yield mysqldb_1.LanguageModel.findOne({ where: { studentId, name } });
                if (!language)
                    return null;
                return mappers_1.LanguageMapper.languageEntityFromObject(language);
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
                const language = yield mysqldb_1.LanguageModel.findByPk(id);
                if (!language)
                    return null;
                return mappers_1.LanguageMapper.languageEntityFromObject(language);
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
                const language = yield mysqldb_1.LanguageModel.destroy({ where: { id } });
                return language === 1;
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
exports.LanguageDataSource = LanguageDataSource;
