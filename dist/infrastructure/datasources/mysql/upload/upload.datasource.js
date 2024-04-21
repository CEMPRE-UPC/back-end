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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadDataSource = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../../../../config");
const domain_1 = require("../../../../domain");
const mysqldb_1 = require("../../../../data/mysqldb");
const mappers_1 = require("../../../mappers");
const sequelize = mysqldb_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class UploadDataSource {
    constructor(generateUUID = config_1.UUIDAdapter.generate) {
        this.generateUUID = generateUUID;
        this.uploadFilePath = path_1.default.join(__dirname, '../../../../../uploads/');
    }
    uploadFile(uploadDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, table, file, typeFile, studentId } = uploadDto;
            const { uploadPath, fileName } = this.createfilePath(file, table, cedula);
            const transaction = yield sequelize.transaction();
            try {
                yield file.mv(uploadPath);
                yield mysqldb_1.AttachedFileModel.create({
                    type: typeFile,
                    file: fileName,
                    studentId
                }, { transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                console.log(error);
                yield transaction.rollback();
                fs_1.default.unlinkSync(uploadPath);
                return false;
            }
        });
    }
    getFilesByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attachedFiles = yield mysqldb_1.AttachedFileModel.findAll({ where: { studentId } });
                // mapear los archivos
                return attachedFiles.map(AttachedFile => mappers_1.UploadMapper.uploadEntityFromObject(AttachedFile));
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
    getFile(showFileDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, id } = showFileDto;
            console.log(showFileDto);
            try {
                const attachedFile = yield mysqldb_1.AttachedFileModel.findByPk(id, { include: 'student' });
                if (!attachedFile)
                    throw domain_1.CustomError.badRequest('File not found');
                const attached = mappers_1.UploadMapper.uploadEntityFromObject(attachedFile.toJSON());
                const filePath = path_1.default.join(this.uploadFilePath, table, attached.student.cedula, attachedFile.file);
                console.log(filePath);
                return filePath;
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
    updateFile(uploadDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, table, file, typeFile, studentId } = uploadDto;
            const attachedFile = yield mysqldb_1.AttachedFileModel.findOne({ where: { studentId, type: typeFile } });
            if (!attachedFile)
                throw domain_1.CustomError.badRequest('File not found');
            const attached = mappers_1.UploadMapper.uploadEntityFromObject(attachedFile.toJSON());
            // borramos el archivo anterior
            const filePath = path_1.default.join(this.uploadFilePath, table, cedula, attached.file);
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
            }
            const { uploadPath, fileName } = this.createfilePath(file, table, cedula);
            const transaction = yield sequelize.transaction();
            try {
                yield file.mv(uploadPath);
                yield attachedFile.update({
                    file: fileName
                }, { transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                console.log(error);
                yield transaction.rollback();
                fs_1.default.unlinkSync(uploadPath);
                return false;
            }
        });
    }
    createfilePath(file, table, cedula) {
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];
        const fileName = this.generateUUID() + '.' + extension;
        const uploadPath = path_1.default.join(this.uploadFilePath, table, cedula, fileName);
        return { uploadPath, fileName };
    }
}
exports.UploadDataSource = UploadDataSource;
