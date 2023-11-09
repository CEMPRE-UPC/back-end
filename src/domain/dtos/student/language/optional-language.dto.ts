import { LevelLanguage } from '../../../types/student';


export class OptionalLanguageDto {

    constructor(
        public id: string,
        public name: string,
        public readingLevel: string,
        public listeningLevel: string,
        public speakingLevel: string,
        public writingLevel: string,
        public studentId: string,
    ) {}


    static create(body: {[key: string]: any}, id: string): [string?, OptionalLanguageDto?] {

        const { studentId } = body;

        
        if (!id) return ['id is required'];
        if (!studentId) return ['studentId is required'];

        const name = body.name || undefined;
        const readingLevel = body.readingLevel || undefined;
        const listeningLevel = body.listeningLevel || undefined;
        const speakingLevel = body.speakingLevel || undefined;
        const writingLevel = body.writingLevel || undefined;


        if (readingLevel ) {
            if (!Object.values(LevelLanguage).includes(readingLevel)) return ['readingLevel is invalid'];
        }
        if (listeningLevel ) {
            if (!Object.values(LevelLanguage).includes(listeningLevel)) return ['listeningLevel is invalid'];
        }
        if (speakingLevel ) {
            if (!Object.values(LevelLanguage).includes(speakingLevel)) return ['speakingLevel is invalid'];
        }
        if (writingLevel ) {
            if (!Object.values(LevelLanguage).includes(writingLevel)) return ['writingLevel is invalid'];
        }

        return [undefined, new OptionalLanguageDto(id, name, readingLevel, listeningLevel, speakingLevel, writingLevel, studentId )];
    }
}