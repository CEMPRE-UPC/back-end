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
exports.PracticeAppGetByIdUseCase = exports.PracticeAppGetByStudentIdUseCase = void 0;
const errors_1 = require("../../errors");
class PracticeAppGetByStudentIdUseCase {
    constructor(practiceApplication) {
        this.practiceApplication = practiceApplication;
    }
    execute(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!studentId)
                throw errors_1.CustomError.badRequest('studentId is required');
            return yield this.practiceApplication.getByIdStudent(studentId);
        });
    }
}
exports.PracticeAppGetByStudentIdUseCase = PracticeAppGetByStudentIdUseCase;
class PracticeAppGetByIdUseCase {
    constructor(practiceApplication) {
        this.practiceApplication = practiceApplication;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw errors_1.CustomError.badRequest('id is required');
            return yield this.practiceApplication.getById(id);
        });
    }
}
exports.PracticeAppGetByIdUseCase = PracticeAppGetByIdUseCase;
