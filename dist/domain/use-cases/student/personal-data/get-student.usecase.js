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
exports.GetStudentByCedulaUseCase = exports.GetStudentByIdUseCase = void 0;
class GetStudentByIdUseCase {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error("Id is required");
            return yield this.studentRepository.getStudentByIdUser(id);
        });
    }
}
exports.GetStudentByIdUseCase = GetStudentByIdUseCase;
class GetStudentByCedulaUseCase {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    execute(cedula) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cedula)
                throw new Error("Cedula is required");
            return yield this.studentRepository.getStudentByCedula(cedula);
        });
    }
}
exports.GetStudentByCedulaUseCase = GetStudentByCedulaUseCase;
