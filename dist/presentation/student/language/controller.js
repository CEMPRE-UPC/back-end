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
exports.LanguageController = void 0;
const domain_1 = require("../../../domain");
const language_1 = require("../../../domain/use-cases/student/language");
const helpers_1 = require("../../helpers");
class LanguageController {
    constructor(languageRepository) {
        this.languageRepository = languageRepository;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, languageDto] = domain_1.LanguageDto.create(req.body);
            console.log(error);
            if (error)
                return res.status(400).json({ message: error });
            new language_1.RegisterUseCase(this.languageRepository).execute(languageDto)
                .then(language => res.json(language))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, optLanguageDto] = domain_1.OptionalLanguageDto.create(req.body, req.params.id);
            if (error)
                return res.status(400).json({ message: error });
            new language_1.UpdateUseCase(this.languageRepository).execute(optLanguageDto)
                .then(language => res.json(language))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.getLanguagesByStudentId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            new language_1.GetAllByStudentIdUseCase(this.languageRepository).execute(studentId)
                .then(languages => res.json(languages))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.getLanguageById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            new language_1.GetLanguageByIdUseCase(this.languageRepository).execute(id)
                .then(language => res.json(language))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            new language_1.DeleteUseCase(this.languageRepository).execute(id)
                .then(language => res.json(language))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
    }
}
exports.LanguageController = LanguageController;
