export class LanguageEntity {

    constructor(
        public id: string,
        public name: string,
        public readingLevel: string,
        public listeningLevel: string,
        public speakingLevel: string,
        public writingLevel: string,
    ) {}
}