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
exports.StudentController = void 0;
const domain_1 = require("../../../domain");
const helpers_1 = require("../../helpers");
const use_cases_1 = require("../../../domain/use-cases");
class StudentController {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, studentDto] = domain_1.StudentDto.create(req.body);
            console.log(error);
            if (error)
                return res.status(400).json({ message: error });
            new domain_1.RegisterStudentUseCase(this.studentRepository).execute(studentDto)
                .then(student => res.json(student))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('update');
            const { cedula } = req.params || req.body;
            const [error, optionalStudentDto] = domain_1.OptionalStudentDto.create(req.body, cedula);
            if (error)
                return res.status(400).json({ message: error });
            new use_cases_1.UpdateStudentUseCase(this.studentRepository).execute(optionalStudentDto)
                .then(student => res.json(student))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.getStudentByIdUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('getStudentByIdUser');
            const { id } = req.params;
            new use_cases_1.GetStudentByIdUseCase(this.studentRepository).execute(id)
                .then(student => res.json(student))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.getStudentByCedula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('getStudentByCedula');
            const { cedula } = req.params;
            new use_cases_1.GetStudentByCedulaUseCase(this.studentRepository).execute(cedula)
                .then(student => res.json(student))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.getAllStudents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const modality = req.query.modality;
            const program = req.query.program;
            console.log('getAllStudents');
            new use_cases_1.GetAllStudentsUseCase(this.studentRepository).execute(modality, program)
                .then(students => res.json(students))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('delete');
            const { id } = req.params;
            new use_cases_1.DeleteUseCase(this.studentRepository).execute(id)
                .then(student => res.json(student))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
    }
}
exports.StudentController = StudentController;
