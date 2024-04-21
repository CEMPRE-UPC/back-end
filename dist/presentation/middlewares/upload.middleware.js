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
exports.UploadMiddleware = void 0;
class UploadMiddleware {
    constructor(uploadRepository) {
        this.uploadRepository = uploadRepository;
        this.validateFile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { studentId, typeFile } = req.body;
            try {
                const attachedFiles = yield this.uploadRepository.getFilesByStudentId(studentId);
                const file = attachedFiles.find(file => file.type === typeFile);
                if (file)
                    return res.status(400).json({ message: 'El archivo ya existe' });
                next();
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.UploadMiddleware = UploadMiddleware;
