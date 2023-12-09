import { LevelLanguage } from '../../../types/student';


export class LanguageDto {

    constructor(
        public name: string,
        public readingLevel: string,
        public listeningLevel: string,
        public speakingLevel: string,
        public writingLevel: string,
        public studentId: string,
    ) {}


    static create(body: {[key: string]: any}): [string?, LanguageDto?] {

        const { name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId   } = body;

        if (!name) return ['name is required'];
        if (!studentId) return ['studentId is required'];
        
        if (!readingLevel) return ['readingLevel is required'];
        if (!Object.values(LevelLanguage).includes(readingLevel)) return ['readingLevel is invalid'];

        if (!listeningLevel) return ['listeningLevel is required'];
        if (!Object.values(LevelLanguage).includes(listeningLevel)) return ['listeningLevel is invalid'];
        
        if (!speakingLevel) return ['speakingLevel is required'];
        if (!Object.values(LevelLanguage).includes(speakingLevel)) return ['speakingLevel is invalid'];

        if (!writingLevel) return ['writingLevel is required'];
        if (!Object.values(LevelLanguage).includes(writingLevel)) return ['writingLevel is invalid'];

        return [undefined, new LanguageDto(name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId )];
    }
}