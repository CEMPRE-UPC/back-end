"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalLanguageDto = void 0;
const student_1 = require("../../../types/student");
class OptionalLanguageDto {
    constructor(id, name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId) {
        this.id = id;
        this.name = name;
        this.readingLevel = readingLevel;
        this.listeningLevel = listeningLevel;
        this.speakingLevel = speakingLevel;
        this.writingLevel = writingLevel;
        this.studentId = studentId;
    }
    static create(body, id) {
        const { studentId } = body;
        if (!id)
            return ['id is required'];
        if (!studentId)
            return ['studentId is required'];
        const name = body.name || undefined;
        const readingLevel = body.readingLevel || undefined;
        const listeningLevel = body.listeningLevel || undefined;
        const speakingLevel = body.speakingLevel || undefined;
        const writingLevel = body.writingLevel || undefined;
        if (readingLevel) {
            if (!Object.values(student_1.LevelLanguage).includes(readingLevel))
                return ['readingLevel is invalid'];
        }
        if (listeningLevel) {
            if (!Object.values(student_1.LevelLanguage).includes(listeningLevel))
                return ['listeningLevel is invalid'];
        }
        if (speakingLevel) {
            if (!Object.values(student_1.LevelLanguage).includes(speakingLevel))
                return ['speakingLevel is invalid'];
        }
        if (writingLevel) {
            if (!Object.values(student_1.LevelLanguage).includes(writingLevel))
                return ['writingLevel is invalid'];
        }
        return [undefined, new OptionalLanguageDto(id, name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId)];
    }
}
exports.OptionalLanguageDto = OptionalLanguageDto;
