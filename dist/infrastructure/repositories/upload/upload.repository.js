"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRepository = void 0;
class UploadRepository {
    constructor(uploadDatasource) {
        this.uploadDatasource = uploadDatasource;
    }
    uploadFile(uploadDto) {
        return this.uploadDatasource.uploadFile(uploadDto);
    }
    getFilesByStudentId(studentId) {
        return this.uploadDatasource.getFilesByStudentId(studentId);
    }
    getFile(showFileDto) {
        return this.uploadDatasource.getFile(showFileDto);
    }
    updateFile(uploadDto) {
        return this.uploadDatasource.updateFile(uploadDto);
    }
}
exports.UploadRepository = UploadRepository;
