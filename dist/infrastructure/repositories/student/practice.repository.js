"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeRepository = void 0;
class PracticeRepository {
    constructor(practiceDatasource) {
        this.practiceDatasource = practiceDatasource;
    }
    getPracticeById(id) {
        return this.practiceDatasource.getPracticeById(id);
    }
    getAllPractices() {
        return this.practiceDatasource.getAllPractices();
    }
    delete(id) {
        return this.practiceDatasource.delete(id);
    }
}
exports.PracticeRepository = PracticeRepository;
