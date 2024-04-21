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
exports.StudentMiddleware = void 0;
class StudentMiddleware {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
        this.existStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const cedula = req.body.cedula || req.params.cedula;
            const student = yield this.studentRepository.getStudentByCedula(cedula);
            if (student)
                return res.status(400).json({ message: 'Student already exists' });
            next();
        });
        this.notfoundStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const cedula = req.body.cedula || req.params.cedula;
            const student = yield this.studentRepository.getStudentByCedula(cedula);
            if (!student)
                return res.status(400).json({ message: 'Student not found' });
            next();
        });
    }
}
exports.StudentMiddleware = StudentMiddleware;
