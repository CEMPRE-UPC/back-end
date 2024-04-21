"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalPracticeApplicationDto = void 0;
const practices_1 = require("../../types/practices");
class OptionalPracticeApplicationDto {
    constructor(id, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, statusCempre, statusProgram, statusFaculty, event, observation, studentId) {
        this.id = id;
        this.identificationFile = identificationFile;
        this.photoFile = photoFile;
        this.classScheduleFile = classScheduleFile;
        this.epsFile = epsFile;
        this.graduationCertificateFile = graduationCertificateFile;
        this.companyRequestLetterFile = companyRequestLetterFile;
        this.statusCempre = statusCempre;
        this.statusProgram = statusProgram;
        this.statusFaculty = statusFaculty;
        this.event = event;
        this.observation = observation;
        this.studentId = studentId;
    }
    static create(body, id) {
        const { studentId } = body;
        if (!studentId)
            return ['studentId is required'];
        if (!id)
            return ['id is required'];
        const identificationFile = body.identificationFile || false;
        const photoFile = body.photoFile || false;
        const classScheduleFile = body.classScheduleFile || false;
        const epsFile = body.epsFile || false;
        const graduationCertificateFile = body.graduationCertificateFile || false;
        const companyRequestLetterFile = body.companyRequestLetterFile || false;
        const statusCempre = body.statusCempre || undefined;
        const statusProgram = body.statusProgram || undefined;
        const statusFaculty = body.statusFaculty || undefined;
        const observation = body.observation || undefined;
        const event = body.event || undefined;
        if (statusCempre) {
            if (!Object.values(practices_1.PracticeApplicationStatus).includes(statusCempre))
                return ['status cempre is invalid'];
        }
        if (statusProgram) {
            if (!Object.values(practices_1.PracticeApplicationStatus).includes(statusProgram))
                return ['status program is invalid'];
        }
        if (statusFaculty) {
            if (!Object.values(practices_1.PracticeApplicationStatus).includes(statusFaculty))
                return ['status faculty is invalid'];
        }
        if (event) {
            if (!Object.values(practices_1.PracticeApplicationEvents).includes(event))
                return ['event is invalid'];
        }
        return [undefined, new OptionalPracticeApplicationDto(id, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, statusCempre, statusProgram, statusFaculty, event, observation, studentId)];
    }
}
exports.OptionalPracticeApplicationDto = OptionalPracticeApplicationDto;
