"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRepository = void 0;
class LanguageRepository {
    constructor(languageDataSource) {
        this.languageDataSource = languageDataSource;
    }
    register(languageDto) {
        return this.languageDataSource.register(languageDto);
    }
    update(optLanguageDto) {
        return this.languageDataSource.update(optLanguageDto);
    }
    getByIdStudent(studentId) {
        return this.languageDataSource.getByIdStudent(studentId);
    }
    getLanguageByName(studentId, name) {
        return this.languageDataSource.getLanguageByName(studentId, name);
    }
    getById(id) {
        return this.languageDataSource.getById(id);
    }
    delete(id) {
        return this.languageDataSource.delete(id);
    }
}
exports.LanguageRepository = LanguageRepository;
