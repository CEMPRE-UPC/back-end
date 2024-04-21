"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMapper = void 0;
const domain_1 = require("../../../domain");
const student_mapper_1 = require("../student/student.mapper");
class UploadMapper {
    static uploadEntityFromObject(object) {
        const { id, _id, type, file, student } = object;
        if (!_id && !id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!type)
            throw domain_1.CustomError.badRequest('Missing name');
        if (!file)
            throw domain_1.CustomError.badRequest('Missing file');
        return new domain_1.AttachedFileEntity(_id || id, type, file, (student) && student_mapper_1.StudentMapper.studentEntityFromObject(student));
    }
}
exports.UploadMapper = UploadMapper;
