"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaInterestController = void 0;
const domain_1 = require("../../../domain");
const area_interest_1 = require("../../../domain/use-cases/student/area-interest");
const helpers_1 = require("../../helpers");
class AreaInterestController {
    constructor(areaInterestRepository) {
        this.areaInterestRepository = areaInterestRepository;
        this.register = (req, res) => {
            const [error, areaInterestDto] = domain_1.AreaInterestDto.create(req.body);
            if (error)
                return res.status(400).json({ message: error });
            new area_interest_1.RegisterUseCase(this.areaInterestRepository).execute(areaInterestDto)
                .then(areaInterest => res.status(200).json(areaInterest))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optAreaInterestDto] = domain_1.OptionalAreaInterestDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new area_interest_1.UpdateUseCase(this.areaInterestRepository).execute(optAreaInterestDto)
                .then(updated => res.status(200).json(updated))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByStudentId = (req, res) => {
            const { studentId } = req.params;
            new area_interest_1.GetAreaInterestUseCase(this.areaInterestRepository).execute(studentId)
                .then(areaInterest => res.status(200).json(areaInterest))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new area_interest_1.DeleteUseCase(this.areaInterestRepository).execute(id)
                .then(deleted => res.status(200).json(deleted))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.AreaInterestController = AreaInterestController;
