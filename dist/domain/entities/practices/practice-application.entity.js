"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeApplicationEntity = void 0;
class PracticeApplicationEntity {
    constructor(id, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, event, statusCempre, statusProgram, statusFaculty, observation, createdAt, updatedAt, studentId) {
        this.id = id;
        this.identificationFile = identificationFile;
        this.photoFile = photoFile;
        this.classScheduleFile = classScheduleFile;
        this.epsFile = epsFile;
        this.graduationCertificateFile = graduationCertificateFile;
        this.companyRequestLetterFile = companyRequestLetterFile;
        this.event = event;
        this.statusCempre = statusCempre;
        this.statusProgram = statusProgram;
        this.statusFaculty = statusFaculty;
        this.observation = observation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.studentId = studentId;
    }
}
exports.PracticeApplicationEntity = PracticeApplicationEntity;
