"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadDto = void 0;
const types_1 = require("../../types");
class UploadDto {
    constructor(cedula, table, file, typeFile, studentId) {
        this.cedula = cedula;
        this.table = table;
        this.file = file;
        this.typeFile = typeFile;
        this.studentId = studentId;
    }
    static create(body, file) {
        const { studentId, cedula, table, typeFile } = body;
        console.log(file);
        if (!cedula)
            return ['cedula is required'];
        if (!table)
            return ['table is required'];
        if (!file)
            return ['file is required'];
        if (!studentId)
            return ['studentId is required'];
        if (!typeFile)
            return ['typeFile is required'];
        // validate typeFile
        if (!Object.values(types_1.TypeFile).includes(typeFile))
            return ['typeFile is invalid'];
        if (!Object.values(types_1.TypeTable).includes(table))
            return ['table is invalid'];
        return [undefined, new UploadDto(cedula, table, file, typeFile, studentId)];
    }
}
exports.UploadDto = UploadDto;
