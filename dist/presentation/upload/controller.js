"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const domain_1 = require("../../domain/");
const helpers_1 = require("../helpers");
class UploadController {
    constructor(uploadRepository) {
        this.uploadRepository = uploadRepository;
        this.saveFile = (req, res, next) => {
            const { file } = req.files;
            const [error, uploadDto] = domain_1.UploadDto.create(req.body, file);
            if (error)
                return res.status(400).json({ message: error });
            new domain_1.SaveFileUseCase(this.uploadRepository).execute(uploadDto)
                .then(result => res.status(200).json({ result }))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getFilesOfStudent = (req, res) => {
            const { studentId } = req.params;
            new domain_1.GetFilesByIdUseCase(this.uploadRepository).execute(studentId)
                .then(files => res.json(files))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getFile = (req, res) => {
            const [error, showFileDto] = domain_1.ShowFileDto.create(req.params);
            if (error)
                return res.status(400).json({ message: error });
            new domain_1.GetFileUseCase(this.uploadRepository).execute(showFileDto)
                .then(file => res.sendFile(file))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.updateFile = (req, res, next) => {
            const { file } = req.files;
            const [error, uploadDto] = domain_1.UploadDto.create(req.body, file);
            if (error)
                return res.status(400).json({ message: error });
            new domain_1.UpdateFileUseCase(this.uploadRepository).execute(uploadDto)
                .then(result => res.status(200).json({ result }))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.UploadController = UploadController;
