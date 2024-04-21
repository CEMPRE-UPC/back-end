"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageDto = void 0;
const student_1 = require("../../../types/student");
class LanguageDto {
    constructor(name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId) {
        this.name = name;
        this.readingLevel = readingLevel;
        this.listeningLevel = listeningLevel;
        this.speakingLevel = speakingLevel;
        this.writingLevel = writingLevel;
        this.studentId = studentId;
    }
    static create(body) {
        const { name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId } = body;
        if (!name)
            return ['name is required'];
        if (!studentId)
            return ['studentId is required'];
        if (!readingLevel)
            return ['readingLevel is required'];
        if (!Object.values(student_1.LevelLanguage).includes(readingLevel))
            return ['readingLevel is invalid'];
        if (!listeningLevel)
            return ['listeningLevel is required'];
        if (!Object.values(student_1.LevelLanguage).includes(listeningLevel))
            return ['listeningLevel is invalid'];
        if (!speakingLevel)
            return ['speakingLevel is required'];
        if (!Object.values(student_1.LevelLanguage).includes(speakingLevel))
            return ['speakingLevel is invalid'];
        if (!writingLevel)
            return ['writingLevel is required'];
        if (!Object.values(student_1.LevelLanguage).includes(writingLevel))
            return ['writingLevel is invalid'];
        return [undefined, new LanguageDto(name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId)];
    }
}
exports.LanguageDto = LanguageDto;
